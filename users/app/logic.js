var fs = require("fs");
var path = require("path");
var sections = JSON.parse(fs.readFileSync("./json/data.json").toString());
var current_section_index;
var current_question_index;
var current_section;
var current_question;
var array_image_questions;
var true_ans = 0;
var false_ans = 0;
var undefined_ans = 0;
var student_name;
var group;
var value = 0;
if(sections.length == 0) {
  current_section = null;
  // current_section_index = 0;
} else {
  // current_section_index = sections.length - 1;
  current_section = sections[current_section_index];
}
if(current_section == null) {
  // current_question_index = 0;
  current_question = null;
  array_image_questions = null
} else {
  // current_question_index = current_section.questions.length - 1;
  // current_question = current_section.questions[current_question_index];
  array_image_questions = current_section.questions[current_question_index];
}
$(function() {
  function add_checkbox() {
    if(sections.length) {
      var div, input, p;
      for(var i = 0; i < sections.length; i++) {
        div = document.createElement("div");
        input = document.createElement("input");
        p = document.createElement("p");
        input.type = "radio";
        input.name = "section";
        $(input).addClass("input_checkbox " + "i_num_s" + i).data("index", i);
        $(div).addClass("div_checkbox " + "d_num_s" + i);
        $(p).addClass("p_checkbox " + "p_num_s" + i).text(sections[i].text);

        $(".hidden_div3").append(div);
        $(".d_num_s" + i).append(input);
        $(".d_num_s" + i).append(p);
      }
    }
  }
  add_checkbox();
  $(".answers").on("click", ".hidden_button", (e) => {
    if(sections.length) {
      value = 0;
      student_name = $(".hidden_input1").val();
      group = $(".hidden_input2").val();
      var rad = document.getElementsByName("section");
      for(var i = 0; i < rad.length; i++) {
        if(rad[i].checked) {
          value = i + 1;
        }
      }
      if(student_name != "" && group != "" && value) {
        $(".hidden_block").remove();
        value-= 1;
      }
      console.log(student_name);
      console.log(group);
      console.log(value)
    }


  });
});
