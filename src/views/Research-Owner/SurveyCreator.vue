<template>
    <div class="survey">
        <h1>Custom Form Creator</h1>

        <form>
            <div><input type="text" v-model="formtitle" placeholder="Enter Form Title">
            <div><input type="text" v-model="formdescription" placeholder="Enter Form Description"></div>

            </div>
            <div v-for="(question, index) in questions" :key="index">
                <label>{{ index + 1 + ') ' }}Question:</label>
                <input type="text" v-model="question.text">

                <v-btn type="button" @click="removeQuestion(index)">Remove Question</v-btn>

                <div v-if="question.type === 'text'">
                    <!--<label>Response:</label>-->
                    <!----> <input v-show="showResponses" type="text" v-model="question.response">
                </div>

                <div v-else-if="question.type === 'multipleChoice'">
                    <label>Options:</label>
                    <div class="options" v-for="(option, optionIndex) in question.options" :key="optionIndex">
                        <input type="text" v-model="option.text">
                        <!----><input v-show="showResponses" type="checkbox" v-model="option.correct">
                        <v-btn type="button" @click="removeOption(question, optionIndex)">Remove Option</v-btn>
                    </div>
                    <v-btn type="button" @click="addOption(question)">Add Option</v-btn>
                    <!--<label>Response:</label>-->
                    <!----> <select v-show="showResponses" v-model="question.response">
                        <option v-for="(option, optionIndex) in question.options" :key="optionIndex" :value="option.text">{{
                            option.text }}</option>
                    </select>
                </div>


                <div v-else-if="question.type === 'radio'">
                    <label>Options:</label>
                    <div class="options" v-for="(option, optionIndex) in question.options" :key="optionIndex">
                        <input type="text" v-model="option.text">
                        <!----><input v-show="showResponses" type="radio" :id="`q${index}_o${optionIndex}`"
                            :value="option.text" v-model="question.response" :name="`q${index}`">
                        <!----><label v-show="showResponses" :for="`q${index}_o${optionIndex}`">{{ option.text }}</label>
                        <v-btn type="button" @click="removeOption(question, optionIndex)">Remove Option</v-btn>
                    </div>
                    <v-btn type="button" @click="addOption(question)">Add Option</v-btn>
                </div>


                <div v-else-if="question.type === 'date'">
                    <!----><label v-show="showResponses">Response (Date):</label>
                    <!----><input v-show="showResponses" type="date" v-model="question.response">
                </div>

                <div v-else-if="question.type === 'img'">
                    <!----><label v-show="showResponses">Response (File):</label>
                    <!----><input v-show="showResponses" type="file">
                </div>

                <div v-else-if="question.type === 'audio'">
                    <!----><label v-show="showResponses">Response (Audio File):</label>
                    <!----><input v-show="showResponses" type="file">
                </div>

                <div v-else-if="question.type === 'video'">
                    <!----><label v-show="showResponses">Response (File):</label>
                    <!----><input v-show="showResponses" type="file">
                </div>


            </div>

        </form>
        <div class="main-question">
            <label> Select Question Type:</label>
            <select v-model="selectedType">
                <option value="text">Text</option>
                <option value="multipleChoice">Multiple Choice</option>
                <option value="radio">Radio Button</option>
                <option value="date">Date</option>
                <option value="img">Image</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>

                <!-- <option value="multipleSelect">Multiple Select</option> -->
            </select>
            <v-btn @click="addQuestion">Add Question</v-btn>
        </div>


    </div>
    <v-btn type="button" class="submit-button" @click.prevent="saveSurvey">Save Survey</v-btn>
    <v-btn v-if="false" @click="toggleResponses" type="button" class="submit-button">Toggle</v-btn>
    <p v-if="true">{{ questions }}</p>
</template>




<script>
export default {
    name: 'SurveyCreator',
    data() {
        return {
            selectedType: 'text',
            formtitle: '',
            formdescription: '',
            questions: [],
            showResponses: false,

            createdForms: []
        }
    },

    methods: {
        addQuestion() {
            if (this.selectedType === 'text') {
                this.questions.push({ type: 'text', text: 'Text Question', response: '' });
            } else if (this.selectedType === 'radio') {
                this.questions.push({ type: 'radio', text: 'Radio Button Question', options: [{ text: '' }], response: '' });
            } else if (this.selectedType === 'multipleChoice') {
                this.questions.push({ type: 'multipleChoice', text: 'Multiple Choice Question', options: [{ text: '', correct: false }], response: '' });
            } else if (this.selectedType === 'date') {
                this.questions.push({ type: 'date', text: 'Date Question', response: '' });
            }
            else if (this.selectedType === 'img') {
                this.questions.push({ type: 'img', text: 'Image Question', response: '' });
            }
            else if (this.selectedType === 'audio') {
                this.questions.push({ type: 'audio', text: 'Audio Question', response: '' });
            }
            else if (this.selectedType === 'video') {
                this.questions.push({ type: 'video', text: 'Video Question', response: '' });
            }
        },
        removeQuestion(index) {
            this.questions.splice(index, 1);

        }, //
        addOption(question) {
            question.options.push({ text: '', correct: false });
        },
        removeOption(question, optionIndex) {
            question.options.splice(optionIndex, 1);
        },
        saveSurvey() {
            //handle the form submission here, e.g., send responses to a server
            this.createdForms.push({title: this.formtitle, description: this.formdescription, questions: this.questions});
            this.questions=[];
        },


        toggleResponses() {
            this.showResponses = !this.showResponses;


        }


        //To be able to Drag Questions so that they can be rearranged
    }
}


</script>
    





<style scoped>
/* Needs Styling */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;

}

.main-question button{
    background-color: rgb(177, 241, 211);
}
.survey {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: left;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}

select,
input[type="text"],
input[type="date"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

select {
background-color: #f1f4fe;
}

.options {
    margin-top: 5px;
}

.options input[type="text"] {
    margin-right: 10px;
    background-color: #f9fee9;
}

.options label {
    display: inline;
    margin-right: 10px;
}

.options button {
    background-color: #f5a799;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.responses {
    margin-top: 10px;
}

.responses label {
    display: block;
    margin-top: 5px;
}

.submit-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
</style>