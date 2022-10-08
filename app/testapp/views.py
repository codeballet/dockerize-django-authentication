import json
import re
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import User

# AI imports
import math
import nltk
import os
import sys
import string

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import numpy as np

nltk.download('stopwords')
nltk.download('punkt')


#########
# Views #
#########

@ensure_csrf_cookie
def index(request):
    return render(request, "testapp/index.html")


#######
# API #
#######

@login_required
def home_loggedin_api(request):
    answers = ai("first")
    return JsonResponse({
        "user": request.session['user'],
        "answers": answers
    }, status=200)


def login_api(request):
    """Login users"""

    if request.method != "POST":
        return JsonResponse({
            "error": "POST request required"
        }, status=405)

    # Acquire form field values
    try:
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]
    except:
        return JsonResponse({
            "error": "No valid login details"
        }, status=500)

    # Form validation
    non_alphanumeric = test_username(username)
    if non_alphanumeric:
        return JsonResponse({
            "error": "Username must be alphanumerical"
        }, status=406)

    # Attempt to authenticate user
    user = authenticate(request, username=username, password=password)

    # If authentication successful, sign in user
    if user is not None:
        login(request, user)
        
        # Store username in session as 'user'
        request.session['user'] = username

        return JsonResponse({
            "message": f"{user} logged in"
        }, status=200)
    else:
        return JsonResponse({
            "error": "Invalid username and/or password"
        }, status=406)


def logout_api(request):
    """Logs out users"""    
    if request.method != "POST":
        return JsonResponse({
            "error": "POST request required"
        }, status=405)
    
    # identify user to log out
    user_leaving = request.session["user"]

    logout(request)

    # Clear user from session
    try:
        del request.session["user"]
    except KeyError:
        pass

    return JsonResponse({
        "user": user_leaving,
        "message": "Logged out"
    }, status=200)


def register_api(request):
    """Add registration to database"""

    if request.method != "POST":
        return JsonResponse({
            "error": "POST request required"
        }, status=405)

    # acquire form field values
    try:
        data = json.loads(request.body)
        username = data["username"]
        email = data["email"]
        password = data["password"]
        confirmation = data["confirmation"]
    except:
        return JsonResponse({
            "error": "No valid registration details"
        }, status=500)

    # Form validation
    non_alphanumeric = test_username(username)
    if non_alphanumeric is not None:
        return JsonResponse({
            "error": "Username must be alphanumerical"
        }, status=406)

    valid_email = test_email(email)
    if valid_email is None:
        return JsonResponse({
            "error": "Invalid email"
        }, status=406)

    if password != confirmation:
        return JsonResponse({
            "error": "Password fields not matching"
        }, status=406)

    # create new user
    try:
        print('creating new user...')
        user = User.objects.create_user(username, email, password)
    except IntegrityError:
        return JsonResponse({
            "error": "Username already taken"
        }, status=409)

    # log in user
    try:
        login(request, user)
        return JsonResponse({
            "message": f"{username} is registered and logged in"
        }, status=201)
    except:
        return JsonResponse({
            "error": "Failed to log in"
        }, status=500)


####################
# Helper functions #
####################

def test_email(email):
    """Detect if email appears valid"""
    pattern = re.compile("^(\w+)@(\w+)(\.\w+)+$")
    return pattern.fullmatch(email)

def test_username(username):
    """Detect if username has non-alphanumeric characters"""
    pattern = re.compile("\W")
    return pattern.search(username)


######
# AI #
######

FILE_MATCHES =1
SENTENCE_MATCHES = 2


def ai(question):

    # TODO: Use form input instead of command-line arguments

    # Calculate IDF values across files
    files = load_files(os.path.abspath("testapp/static/testapp/corpus"))
    file_words = {
        filename: tokenize(files[filename])
        for filename in files
    }
    file_idfs = compute_idfs(file_words)

    # Tokenize query
    query = set(tokenize(question))

    # Determine top file matches according to TF-IDF
    filenames = top_files(query, file_words, file_idfs, n=FILE_MATCHES)

    # Extract sentences from top files
    sentences = dict()
    for filename in filenames:
        for passage in files[filename].split("\n"):
            for sentence in nltk.sent_tokenize(passage):
                tokens = tokenize(sentence)
                if tokens:
                    sentences[sentence] = tokens

    # Compute IDF values across sentences
    idfs = compute_idfs(sentences)

    # Determine top sentence matches
    matches = top_sentences(query, sentences, idfs, n=SENTENCE_MATCHES)
    
    return matches


def load_files(directory):
    """
    Given a directory name, return a dictionary mapping the filename of each
    `.txt` file inside that directory to the file's contents as a string.
    """
    contents = {}
    
    # for files in given directory, create dictionary with {filename: text}
    for file in os.listdir(directory):
        with open(os.path.join(directory, file)) as f:
            contents[file] = f.read()

    return contents

def tokenize(document):
    """
    Given a document (represented as a string), return a list of all of the
    words in that document, in order.

    Process document by coverting all words to lowercase, and removing any
    punctuation or English stopwords.
    """
    # tokenize document
    tokens_list = word_tokenize(document)

    # make lower case; filter out punctuation and stopwords
    filtered_tokens_list = [
        word.lower() for word in tokens_list if 
        word not in string.punctuation and 
        word not in stopwords.words('english')
        ]

    return filtered_tokens_list


def compute_idfs(documents):
    """
    Given a dictionary of `documents` that maps names of documents to a list
    of words, return a dictionary that maps words to their IDF values.

    Any word that appears in at least one of the documents should be in the
    resulting dictionary.
    """
    # count how many documents there are
    documents_count = len(documents)

    # create a set of the words
    all_words = set()
    for words in documents.values():
        all_words.update(words)

    # find out how many documents each word appears in
    word_doc_count = {}
    for word in all_words:
        count = 0
        for document in documents:
            if word in documents[document]:
                count += 1
        word_doc_count[word] = count

    # calculate the inverse document frequency of each word as
    # ln(total number of documents / number of documents containing word)
    idfs = {}
    for word, count in word_doc_count.items():
        idf = math.log(documents_count / count)
        idfs[word] = idf

    # Return a dictionary mapping the words to their idf values
    return idfs


def top_files(query, files, idfs, n):
    """
    Given a `query` (a set of words), `files` (a dictionary mapping names of
    files to a list of their words), and `idfs` (a dictionary mapping words
    to their IDF values), return a list of the filenames of the the `n` top
    files that match the query, ranked according to tf-idf.
    """
    # calculate the sum of tf-idf values of the query for each file
    tf_idf_files = []
    tf_idf_values = []

    for file in files:
        # calculate the sum of tf-idf values for each file
        tf = 0
        tf_idf_sum = 0
        for term in query:
            for word in files[file]:
                if term == word:
                    tf += 1
            if term in files[file]:
                tf_idf_sum += tf * idfs[term]

        tf_idf_files.append(file)
        tf_idf_values.append(tf_idf_sum)

    # make a list of files ordered by total tf-idf value
    files_ordered = []

    while len(tf_idf_files) > 0:
        i = tf_idf_values.index(max(tf_idf_values))
        if n > 0:
            # only add n elements to the list
            files_ordered.append(tf_idf_files[i])
            n -= 1
            if n == 0:
                break
        del tf_idf_files[i]
        del tf_idf_values[i]

    return files_ordered

def top_sentences(query, sentences, idfs, n):
    """
    Given a `query` (a set of words), `sentences` (a dictionary mapping
    sentences to a list of their words), and `idfs` (a dictionary mapping words
    to their IDF values), return a list of the `n` top sentences that match
    the query, ranked according to idf. If there are ties, preference should
    be given to sentences that have a higher query term density.
    """
    # calculate the sum of idfs for each sentence
    slist = []
    slist_idfs = []

    for sentence, words in sentences.items():
        sent_idf = 0
        for word in words:
            for term in query:
                if word == term:
                    sent_idf += idfs[word]
        slist.append(sentence)
        slist_idfs.append(sent_idf)

    # check for ties of sentence idf values
    a = np.array(slist_idfs)
    # ties = np.argwhere(a == np.amax(a)).flatten().tolist()
    ties = np.flatnonzero(a == np.amax(a)).tolist()

    # If there are ties, order sentences by Query Term Density
    # (proportion of words in sentence that is also in query)
    qtd_sentences = []
    qtd_values = []

    if len(ties) > 1:
        for index in ties:
            words_count = 0
            terms_count = 0
            for word in slist[index]:
                # for each word in the sentence
                words_count += 1
                for term in query:
                    if term == word:
                        # check if word is in query
                        terms_count += 1
            # calculate the QTDs for sentences
            qtd_sentences.append(slist[index])
            qtd_values.append(terms_count / words_count)

    # order the qtd_sentences according to descending QTD values
    qtd_sentences_ordered = []

    while len(qtd_sentences) > 0:
        i = qtd_values.index(max(qtd_values))
        qtd_sentences_ordered.append(qtd_sentences[i])
        del qtd_sentences[i]
        del qtd_values[i]
    
    # order the slist according to descending idf values
    slist_ordered = []

    while len(slist) > 0:
        i = slist_idfs.index(max(slist_idfs))
        slist_ordered.append(slist[i])
        del slist[i]
        del slist_idfs[i]

    # remove sentences in qtd_sentences_ordered from slist_ordered
    for s in qtd_sentences_ordered:
        slist_ordered.remove(s)

    # merge the qtd_sentences_ordered list with slist_ordered
    total_ordered_list = qtd_sentences_ordered + slist_ordered

    # only return n elements of total_ordered_list
    n_list = []

    for i in range(n):
        n_list.append(total_ordered_list[i])

    return n_list
