from flask import Flask, render_template, request, jsonify
import tensorflow as tf
import tensorflow_hub as hub
import json
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Load the results from JSON
with open('results4.json', 'r') as f:
    results = json.load(f)

# Load the Universal Sentence Encoder module
module_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
# module_url = load_model('model(1).h5')
embed = hub.load(module_url)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    question = data['question']

    # Embed the input question
    embedded_question = embed([question])

    # Calculate cosine similarity scores
    cos_scores = []
    for module in results.keys():
        embedded_answer = embed([module])
        similarity_score = tf.reduce_sum(tf.multiply(
            embedded_question, embedded_answer), axis=1).numpy()[0]
        cos_scores.append(similarity_score)

    # Sort the scores in descending order
    sorted_indices = sorted(range(len(cos_scores)),
                            key=lambda k: cos_scores[k], reverse=True)

    # Get the top 10 relevant modules, discussion titles, and links
    top_modules = []
    top_titles = []
    link_diskusi = []

    for index in sorted_indices[:10]:
        module = list(results.keys())[index]
        title = results[module]
        link = results[module]
        top_modules.append(module)
        top_titles.append(title)
        link_diskusi.append(link)

    response = {
        'top_modules': top_modules,
        'top_titles': top_titles,
        'link_diskusi': link_diskusi
    }

    return jsonify(response)


if __name__ == '__main__':
    app.run()

    # cos_scores = []
    # for i in range(len(results['module_name'])):
    #     embedded_answer = embed([results['module_name'][i]])
    #     similarity_score = tf.reduce_sum(tf.multiply(
    #         embedded_question, embedded_answer), axis=1).numpy()[0]
    #     cos_scores.append(similarity_score)

    # # Sort the scores in descending order
    # sorted_indices = sorted(range(len(cos_scores)),
    #                         key=lambda k: cos_scores[k], reverse=True)

    # # Get the top 10 relevant modules, discussion titles, and links
    # top_modules = []
    # top_titles = []
    # link_diskusi = []

    # for index in sorted_indices[:10]:
    #     module = results['module_name'][index]
    #     title = results['discussion_title'][index]
    #     link = results['link_diskusi'][index]
    #     top_modules.append(module)
    #     top_titles.append(title)
    #     link_diskusi.append(link)

    # response = {
    #     'top_modules': top_modules,
    #     'top_titles': top_titles,
    #     'link_diskusi': link_diskusi
    # }

    # return jsonify(response)
