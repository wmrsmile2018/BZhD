var fs = require("fs");
var path = require("path");
var sections = JSON.parse(fs.readFileSync("./json/data.json").toString());
var current_section;
var current_question;
var array_image_questions;
var current_question_index = 0;
var true_ans = 0;
var false_ans = 0;
var undefined_ans = 0;
var student_name;
var group;
var value = 0;
if(sections.length == 0) {
  current_section = null;
} else {
  current_section = sections[value];
}
if(current_section == null) {
  current_question = null;
  array_image_questions = null
} else {
  current_question = current_section.questions[current_question_index];
  array_image_questions = current_section.questions[current_question_index];
}
$(function() {

  var button = document.createElement("button");
  $(button).addClass("save").text("save");
  $(button).hide();
  $(".answers").append(button);

  function add_elements() {
    add_section();
    add_leftMenu();
    add_QuestionContent();
  }
  $(".answers").on("click", ".checkbox", (e) => {
    tmp = $(e.target).data("index");
    current_question.ans[tmp].ans_flag = e.target.checked;
    add_elements();
  });
  $(".questions").on("click", ".q_el_t", (e) => {
    current_question_index = $(e.target).data("index");
    var tmp = current_question_index;
    current_question = current_section.questions[tmp];
    array_image_questions = current_section.questions[tmp];
    add_elements();
  });
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
  function add_section() {
    $(".s_el_t").remove();
    var div = document.createElement("div");
    $(div).addClass("s_el_t").text(sections[value].text);
    $(".section").append(div);
  }
  function add_leftMenu() {
    $(".q_el_t").remove();
    var div;
    for(var i = 0; i < current_section.questions.length; i++) {
      div = document.createElement("div");
      $(div).addClass("q_el_t " +"q_el_num" + i).text(current_section.questions[i].text);
      $(div).data("index", i);
      $(".questions").append(div);
    }
    $(".q_el_num" + current_question_index).css("background", "#bbbbbb4a");
  }
  function add_QuestionContent() {
    $(".text").remove();
    $(".array_images").remove();
    $(".f_ans").remove();
    var div, div1, div2, input, text, form, p, img, img1;
    var extension;
    for(var i = 0; i < current_question.ans.length; i++) {
      img = document.createElement("img");
      div = document.createElement("div");
      div1 = document.createElement("div");
      div2 = document.createElement("div");
      p = document.createElement("p");
      input = document.createElement("input");
      text = document.createElement("div");
      form = document.createElement("form");
      input.checked = current_question.ans[i].ans_flag;
      input.type = "checkbox";

      if(!i) {
        $(div1).addClass("array_images");
        $(form).addClass("f_ans");
        $(text).addClass("text " + "text_num" + i).text(current_question.ans[i].text_q);
        $(".save").before(text);
        $(".save").before(div1);
        $(".save").before(form);
        for(var t = 0; t < current_question.image_q.length; t++) {
          extension = current_question.image_q[t].name.split(".").pop();
          img1 = document.createElement("img");
          $(img1).addClass("arr_img").data("index", t).attr("src", `data:image/${extension};base64,${fs.readFileSync(current_question.image_q[t].image_data).toString("base64")}`);
          $(".array_images").append(img1);
        }
      }
      $(input).data("index", i).addClass("checkbox");
      $(p).addClass("p_ans " + "p_ans_el" + i);
      $(".f_ans").append(p);
      $(".p_ans_el" + i).append(input);
      $(div).addClass("a_el " + "a_num_a_el" + i).data("index", i);
      $(".p_ans_el" + i).append(div);

      if(current_question.ans[i].kind == "text") {
        $(div2).addClass("a_el_t " + "a_el_num" + i).text(current_question.ans[i].text_a).data("index", i);
        $(".a_num_a_el" + i).append(div2);
      } else if (current_question.ans[i].kind == "image") {
        extension = current_question.ans[i].name.split(".").pop();
        $(img).addClass("a_el_i " + "a_el_num_i" + i).data("index", i).attr("src",          `data:image/${extension};base64,${fs.readFileSync(current_question.ans[i].image_a).toString("base64")}`);
        $(".a_num_a_el" + i).append(img);
      }
    }
    for(var i = 0; i < current_question.ans.length; i++) {
      if(current_question.ans[i].ans_flag) {
        $(".answers .p_ans_el" + i).css("background", "#e6e6e6");
      } else {
        $(".answers .p_ans_el " + i).css("background", "#fff");
      }
    }
  }

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
    $(".save").show();
    add_elements();
    }
  });
});
