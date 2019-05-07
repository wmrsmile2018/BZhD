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
          $(img1).addClass("arr_img").data("index", t).attr("src",`data:image/${extension};base64,${fs.readFileSync(current_question.image_q[t].image_data).toString("base64")}`);
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
        $(img).addClass("a_el_i " + "a_el_num_i" + i).data("index", i).attr("src",`data:image/${extension};base64,${fs.readFileSync(current_question.ans[i].image_a).toString("base64")}`);
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

  function calc_res() {
    console.log(sections);
    var progress = 0, false_flag = 0;
    var cur_q;
    for(var i = 0; i < current_section.questions.length; i++) {
      cur_q = current_section.questions[i];
      for(var t = 0; t < cur_q.ans.length; t++) {
        if(cur_q.ans[t].ans_flag != cur_q.ans[t].flag) {
          false_flag++;
        }
      }
      if(false_flag) {
        false_ans++;
      } else {
        true_ans++;
      }
    }
    console.log(true_ans);
    console.log(false_ans);
    progress = true_ans / (false_ans + true_ans) * 100;
    return parseFloat(progress.toFixed(2));
  }
  function print_data() {
    var div, p1, p2, p3;
    var procent = calc_res();
    div = document.createElement("div");
    p1 = document.createElement("p");
    p2 = document.createElement("p");
    p3 = document.createElement("p");
    $(div).addClass("data");
    $(p1).addClass("p1_data").text("Студент: " + student_name);
    $(p2).addClass("p2_data").text("Группа: " + group);
    $(p3).addClass("p3_data").text("Прогресс: " + procent + "%");
    $(".answers_res").append(div);
    $(".data").append(p1);
    $(".data").append(p2);
    $(".data").append(p3);
  }
  function print_result() {
    var div, div_true, div1_true, div_false, div1_false, p1, p2;
    p1 = document.createElement("p");
    p2 = document.createElement("p");
    div = document.createElement("div");
    div_true = document.createElement("div");
    div1_true = document.createElement("div");
    div_false = document.createElement("div");
    div1_false = document.createElement("div");
    $(p1).add("true_res").text(true_ans);
    $(p2).add("false_res").text(false_ans);
    $(div).addClass("result");
    $(div_true).addClass("div_true");
    $(div1_true).addClass("div1_true").css("height", 200 * true_ans / (true_ans + false_ans));
    $(div1_false).addClass("div1_false").css("height", 200 * false_ans / (true_ans + false_ans));
    $(div_false).addClass("div_false");
    $(".answers_res").append(div);
    $(".result").append(div_true);
    $(".result").append(div_false);
    $(".div_true").append(div1_true);
    $(".div_false").append(div1_false);
    $(".div_true").append(p1);
    $(".div_false").append(p2);
  }

  $(".answers").on("click", ".checkbox", (e) => {
    tmp = $(e.target).data("index");
    current_question.ans[tmp].ans_flag = e.target.checked;
    add_elements();
  });

  $(".answers").on("click", ".save", (e) => {
      $(".answers").remove();
      $(".q_el_t").remove();
      var div = document.createElement("div");
      $(div).addClass("answers_res");
      $(".contents").append(div);
      print_data();
      print_result();
  });
  $(".questions").on("click", ".q_el_t", (e) => {
    current_question_index = $(e.target).data("index");
    var tmp = current_question_index;
    current_question = current_section.questions[tmp];
    array_image_questions = current_section.questions[tmp];
    add_elements();
  });


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
        $(".save").show();
        add_elements();
      }
    }
  });
});
