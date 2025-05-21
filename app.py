from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/question2')
def question2():
    return render_template('question2.html')

@app.route('/question3')
def question3():
    return render_template('question3.html')

@app.route('/question4')
def question4():
    return render_template('question4.html')

@app.route('/question5')
def question5():
    return render_template('question5.html')

if __name__ == '__main__':
    app.run(debug=True)