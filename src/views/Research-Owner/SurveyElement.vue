<template>
    <v-card width="auto" height="auto" > <!--@click="openDialog(form)" -->
        <v-card-title class="justify-center">
            
            <h4> {{ form.title }}</h4>
        </v-card-title>
        <v-card-text>
            <p> {{ form.description }}</p>
        </v-card-text>

        <v-card-text v-if="form.createdAt">
            <b>
            Created on: {{form.createdAt.slice(0, 10)}}
        </b>
        </v-card-text>
        <v-card-actions>
            <v-row justify="center">
                <!-- DIALOG -->
                <v-dialog v-model="dialog" scrollable width="1024">
                    <template v-slot:activator="{ props }">
                        <v-btn color="primary" v-bind="props" variant="tonal">
                            Show Form
                        </v-btn>
                    </template>
                    <!-- DIALOG CONTENT -->
                    <v-card>
                        
                        <v-card-actions>
                            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                Close
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                        <v-card-title class="text-center">
                            <span class="text-h5">{{ form.title }}</span>
                        </v-card-title>
                        
                        <!-- FORM -->
                        <v-container fluid>
                            <div class="survey"> <!--  style="height: 300px;" -->
                                <form>
                                    <div v-for="(question, index) in form.data.fields" :key="index">
                                        <br>
                                        <label>{{ index + 1 + ') ' }}Question:</label>
                                        <label>{{ question.label }}</label>

                                        <!-- Text Question -->
                                        <div v-if="question.type === 'text'">
                                            <!-- <label>Response:</label> -->
                                            <!----> <input v-show="showResponses" type="text" v-model="question.value">
                                        </div>

                                         <!-- Number Question -->
                                         <div v-if="question.type === 'number'">
                                            <!-- <label>Response:</label> -->
                                            <input v-show="showResponses" type="number" v-model="question.value">
                                        </div>


                                        <!-- Dropdown Question -->
                                        <div v-else-if="question.type === 'dropdown'">
                                            <label>Options:</label>
                                            <select v-show="showResponses" v-model="question.value">
                                                <option v-for="(option, optionIndex) in question.data" :key="optionIndex"
                                                    :value="option">{{
                                                        option }}</option>
                                            </select>
                                        </div>

                                        <!-- Radio Button Question -->
                                        <div v-else-if="question.type === 'radio'">
                                            <label>Options:</label>
                                            <div class="options" v-for="(option, optionIndex) in question.data"
                                                :key="optionIndex">
                                                <!----><input v-show="showResponses" type="radio"
                                                    :id="`q${index}_o${optionIndex}`" :value="option.text"
                                                    v-model="question.value" :name="`q${index}`">
                                                <!----><label v-show="showResponses" :for="`q${index}_o${optionIndex}`">
                                                {{ " " + option }}</label>
                                            </div>
                                            <!-- <label>Response:</label> -->
                                        
                                        </div>
                                       
                                        <!-- File Question -->
                                        <div v-else-if="question.type === 'file'">
                                            <!-- <label v-show="showResponses">Response (File):</label> -->
                                            <!----><input v-show="showResponses" type="file">
                                        </div>
                                       


                                        <!-- multiple Choice Question -->
                                        <!-- <div v-else-if="question.type === 'multipleChoice'">
                                            <label>Options:</label>

                                            <div class="options" v-for="(option, optionIndex) in question.options"
                                                :key="optionIndex">
                                                <div class="mt-4"></div>
                                               <input v-show="showResponses" type="checkbox"
                                                    v-model="option.correct">
                                                <label>{{ " " + option.text }}</label>
                                            </div>

                                            <label>Response:</label>
                                             <select v-show="showResponses" v-model="question.response">
                                                <option v-for="(option, optionIndex) in question.options" :key="optionIndex"
                                                    :value="option.text">{{
                                                        option.text }}</option>
                                            </select>
                                        </div> -->

                                         <!-- Date Question -->
                                         <!-- <div v-else-if="question.type === 'number'">
                                            <label v-show="showResponses">Response (Number):</label>
                                            <input v-show="showResponses" type="date" v-model="question.value">
                                        </div> -->
                                    </div>
                                </form>
                            </div>
                        </v-container>
                    </v-card>
                </v-dialog>              

                                               
            </v-row>
        </v-card-actions>
    </v-card>
</template>

<script>

export default {
    name: "SurveyElement",
    props: {
        form: Object,
    },
    mounted() {
        console.log(this.form);
    },
    data() {
        return {
            dialog: false,
            showResponses: true,
        };
    },
    methods: {
        openDialog(form) {
            this.dialog = true;
        },
    },
};

</script>

<style scoped>
/* Needs Styling */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;

}

.main-question button {
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
input[type="number"],
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