let fs = require('fs');
let path = require('path');

var i_s = 0, i = 0, i_q = 0;
// 27 - esc
// 13 - enter
var sections = [];
var current_section_index = 0;
var current_question_index = 0;
var current_answer_index = 0;
var current_answer_index_checkbox = 0;
var current_section = null;
var current_question = null;
var section_last_index = 0;
var question_last_index = 0;
var answer_last_index = 0;
var touch_time_s = 0;
var touch_time_q = 0;
var touch_time_a_t = 0;
var touch_time_a_a = 0;
var placeholder_data = "data:image/png;base64," + fs.readFileSync("placeholder.png").toString("base64");

$(function() {
  // Добавить функцию esc
  // function sleep(ms) {
  //   ms += new Date().getTime();
  //   while (new Date() < ms){}
  // }

  // спроецировать текст вопроса в new question ?

  function reload() {
    reloadNavigation(sections, current_section_index);
    reloadLeftMenu(current_section, current_question_index);
    reloadQuestionContent(current_question);
  }

  $(".answers").on("change", ".image_input_a", (e) => {
    var input = e.target;
    var tmp = $(input).data("index");
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      var extension = input.files[0].path.split(".").pop();
      var data = (new Date()).getTime() + "." + extension;
      fs.writeFile("./images/" + data, fs.readFileSync(input.files[0].path), (err) => {
         if(err) {
           console.log(err);
         }
         console.log("file is saved");
        });
      current_question.ans[tmp].image_a = `data:image/${extension};base64,${fs.readFileSync(input.files[0].path).toString("base64")}`;
      current_question.ans[tmp].name = data;
      reload();
      }
  });
  $(".answers").on("click", "input", (e) => {
    current_answer_index_checkbox = $(e.target).data("index");
    var tmp = current_answer_index_checkbox;
    current_question.ans[tmp].flag = e.target.checked;
    if(current_question.ans[tmp].flag) {
      $(".p_ans_el" + tmp).css("background", "#e6e6e6");
    } else {
      $(".p_ans_el" + tmp).css("background", "#fff");
    }
  });

  $(".section").on("click", ".s_el_t", function(e) {
    current_section_index = $(e.target).data("index");
    var tmp = current_section_index;
    $(".a_num_s_el" + tmp).css("background", "#e2e5de");
    current_section = sections[tmp];
    current_question = current_section.questions[0];
  });

  $(".section").on("click", ".s_el input", (e) => {
    e.stopPropagation();
  });

  $(".section").on("click", ".s_el", function(e) {
    current_section_index = $(e.target).data("index");
    var tmp = current_section_index;
    $(".a_num_s_el" + tmp).css("background", "#e2e5de");
    current_section = sections[tmp];
    current_question = current_section.questions[0];
    reload();
    if(touch_time_s == 0) {
      touch_time_s = new Date().getTime();
    } else {
      if(((new Date().getTime()) - touch_time_s) < 400) {
        var input = document.createElement("input");
        input.type = "text";
        input.size = 20;
        $(input).addClass("text_s" + tmp + " s_el_t");
        $(".s_el_num" + tmp).hide();
        $(".r_num_s_el" + tmp).before(input);
        $(".text_s" + tmp).val($(".s_el_num" + tmp).text());
        $(".text_s" + tmp).keydown(function(e) {
          if(e.which == 13) {
            sections[tmp].text = $(".text_s" + tmp).val();
            $(".s_el_num" + tmp).show();
            $(".text_s" + tmp).hide();
            $(".a_num_s_el" + tmp).css("background", "#e2e5de");
            current_section = sections[tmp];
            current_question = current_section.questions[0];
            reload();
          }
        });
      }
      touch_time_s = 0;
    }
  });

  $(".questions").on("click", ".q_el_t", function(e) {
    current_question_index = $(e.target).data("index");//#c2cac7
    var tmp = current_question_index;
    $(".a_num_q_el" + tmp).css("background", "#bbbbbb4a");
    current_question =  current_section.questions[tmp];
  });

  $(".questions").on("click", ".q_el input", (e) => {
    e.stopPropagation();
  });

  $(".questions").on("click", ".q_el", function(e) {
    current_question_index = $(e.target).data("index");//#c2cac7
    var tmp = current_question_index;
    $(".a_num_q_el" + tmp).css("background", "#bbbbbb4a");
    current_question =  current_section.questions[tmp];
    reload();
    if(touch_time_q == 0) {
      touch_time_q = new Date().getTime();
    } else {
      if(((new Date().getTime()) - touch_time_q) < 400) {
        var input = document.createElement("input");
        input.type = "text";
        input.size = 12;
        $(input).addClass("text_q" + tmp + " q_el_t");
        console.log($(".q_el_num" + tmp).text());
        $(".q_el_num" + tmp).hide();
        $(".r_num_q_el" + tmp).before(input);
        $(".text_q" + tmp).val($(".q_el_num" + tmp).text());
        $(".text_q" + tmp).keydown(function(e) {
          if(e.which == 13) {
            current_section.questions[tmp].text = $(".text_q" + tmp).val();
            $(".q_el_num" + tmp).show();
            $(".text_q" + tmp).hide();
            $(".a_num_q_el" + tmp).css("background", "#bbbbbb4a");
            current_question =  current_section.questions[tmp];
            reload();
          }
        });
      }
      touch_time_q = 0;
    }
  });

  $(".answers").on("click", ".text", (e) => {
    // current_question_index = $(e.target).data("index");//#c2cac7
    // var tmp = current_question_index;
    // console.log(tmp);
    if(touch_time_a_t == 0) {
      touch_time_a_t = new Date().getTime();
    } else {
      if(((new Date().getTime()) - touch_time_a_t) < 400) {
        var input = document.createElement("input");
        input.type = "text";
        input.size = 12;
        $(input).addClass("text_t");
        $(".text").hide();
        $(".f_ans").before(input);
        $(".text_t").val($(".text").text());
        $(".text_t").keydown((e) => {
          // console.log(current_question.ans[0].te);
          if(e.which == 13) {
            // console.log($(".text_t").val());
            current_question.ans[0].text_q = $(".text_t").val();
            console.log(current_question.ans[0].text_q);
            console.log($(".text_t").val());
            $(".text").show();
            $(".text_t").hide();
            reload();
          }
        });
      }
      touch_time_a_t = 0;
    }
  });

  $(".answers").on("click", ".a_el", (e) => {
    current_question_index = $(e.target).data("index");//#c2cac7
    var tmp = current_question_index;
    if(current_question.ans[tmp].kind == "text") {
      if(touch_time_q == 0) {
        touch_time_q = new Date().getTime();
      } else {
        if(((new Date().getTime()) - touch_time_q) < 400) {
          var input = document.createElement("input");
          input.type = "text";
          input.size = 12;
          $(input).addClass("text_a" + tmp + " a_el_t");
          $(".a_el_num" + tmp).hide();
          $(".r_num_a_el" + tmp).before(input);
          $(".text_a" + tmp).val($(".a_el_num" + tmp).text());
          $(".text_a" + tmp).keydown((e) => {
            if(e.which == 13) {
              current_question.ans[tmp].text_a = $(".text_a" + tmp).val();
              $(".a_el_num" + tmp).show();
              $(".text_a" + tmp).hide();
              reload();
            }
          });
        }
        touch_time_q = 0;
      }
    }
  });

  $(".section").on("click", ".rem_s_el", function(e) {
    e.stopPropagation();
    var index = $(e.currentTarget).data("index");
    var questions_length = sections[index].questions.length;
    var ans_length;
    for(var t = questions_length - 1; t >= 0; t--) {
      ans_length = sections[index].questions[t].ans.length;
      for(var d = ans_length - 1; d >= 0; d--) {
        sections[index].questions[t].ans.pop();
      }
      sections[index].questions.pop();
    }
    sections.splice(index, 1);
    reload();
  });

  $(".questions").on("click", ".rem_q_el", function(e) {
    e.stopPropagation();
    var index = $(e.currentTarget).data("index");
    var ans_length;
    for(var d = ans_length - 1; d >= 0; d--) {
      current_section.questions[t].ans.pop();
    }
    current_section.questions.splice(index, 1);
    reload();
  });

  $(".answers").on("click", ".rem_a_el", function(e) {
    e.stopPropagation();
    var index = $(e.currentTarget).data("index");
    $(".a_num_q_el" + index).remove();
    current_question.ans.splice(index, 1);
    reload();
  });

  function reloadNavigation(sections, index) {
    var div, a, span, p, div2;
    $(".s_el").remove();
    for(var i = 0; i < sections.length; i++) {
      div = document.createElement("div");
      div2 = document.createElement("div");
      a = document.createElement("a");
      span = document.createElement("span");
      $(div2).addClass("s_el_t " +"s_el_num" + i).text(sections[i].text);
      $(div).addClass("s_el " + "a_num_s_el" + i);
      $(div).data("index", i);
      $(div2).data("index", i);
      $(a).addClass("rem_s_el " + "r_num_s_el" + i);
      $(a).data("index", i);
      $(span).addClass("glyphicon glyphicon-minus");
      $(".section .add_s").before(div);
      $(".a_num_s_el" + i).append(div2);
      $(".a_num_s_el" + i).append(a);
      $(".r_num_s_el" + i).append(span);
    }


      $(".a_num_s_el" + index).css("background", "#e2e5de");
  }

  function reloadLeftMenu(current_section, index) {
    $(".q_el").remove();
    if(sections.length) {
      var div, a, span, div2, form;
      for(var i = 0; i < current_section.questions.length; i++) {
        div = document.createElement("div");
        div2 = document.createElement("div");
        a = document.createElement("a");
        span = document.createElement("span");

        $(div2).addClass("q_el_t " +"q_el_num" + i).text(current_section.questions[i].text);
        $(div).addClass("q_el " + "a_num_q_el" + i);
        $(div).data("index", i);
        $(div2).data("index", i);
        $(a).addClass("rem_q_el " + "r_num_q_el" + i);
        $(a).data("index", i);
        $(span).addClass("glyphicon glyphicon-minus");
        $(".questions .add_q").before(div);
        $(".a_num_q_el" + i).append(div2);
        $(".a_num_q_el" + i).append(a);
        $(".r_num_q_el" + i).append(span);
      }
      $(".a_num_q_el" + index).css("background", "#bbbbbb4a");
    }
  }

  function reloadQuestionContent(current_question) {
    $(".f_ans").remove();
    $(".text").remove();
    $(".text_t").remove();
    $(".add_image").remove();
    if(current_section.questions.length) {
      var div, div2, input, input2, a, a1, span, span1, text, form, p, img;
      for(var i = 0; i < current_question.ans.length; i++) {
        img = document.createElement("img");
        div = document.createElement("div");
        div2 = document.createElement("div");
        a = document.createElement("a");
        span = document.createElement("span");
        a1 = document.createElement("a");
        span1 = document.createElement("span");
        p = document.createElement("p");
        input = document.createElement("input");
        text = document.createElement("div");
        form = document.createElement("form");
        input2 = document.createElement("input");

        input.checked = current_question.ans[i].flag;
        input.type = "checkbox";
        input.name = "ans" + i;
        input2.type = "file";

        if(!i) {
          $(a1).addClass("add_image");
          $(span1).addClass("add_a_i").text("add image");
          $(form).addClass("f_ans");
          $(text).addClass("text " + "text_num" + i).text(current_question.ans[i].text_q);
          $(".answers .add_a").before(text);
          $(".answers .add_a").before(a1);
          $(".add_image").append(span1);

          $(".answers .add_a").before(form);
        }

        $(input).data("index", i);
        $(input2).data("index", i);
        $(input2).addClass("image_input_a " + "i_i_a_num" + i);
        $(p).addClass("p_ans " + "p_ans_el" + i);
        $(".f_ans").append(p);
        $(".p_ans_el" + i).append(input);
        $(div).addClass("a_el " + "a_num_a_el" + i).data("index", i);
        $(".p_ans_el" + i).append(div);

        if(current_question.ans[i].kind == "text") {
          $(div2).addClass("a_el_t " + "a_el_num" + i).text(current_question.ans[i].text_a).data("index", i);
          $(".a_num_a_el" + i).append(div2);
        } else if (current_question.ans[i].kind == "image") {
          // console.log(current_question.ans[i].image_a);
          $(img).addClass("a_el_i " + "a_el_num_i" + i).data("index", i).attr("src", current_question.ans[i].image_a);
          $(".a_num_a_el" + i).append(img);
          $(".a_num_a_el" + i).append(input2);
        }
        $(a).addClass("rem_a_el " + "r_num_a_el" + i).data("index", i);
        $(span).addClass("glyphicon glyphicon-minus");
        $(".a_num_a_el" + i).append(a);
        $(".r_num_a_el" + i).append(span);
      }
      for(var i = 0; i < current_question.ans.length; i++) {
        if(current_question.ans[i].flag) {
          $(".answers .p_ans_el" + i).css("background", "#e6e6e6");
        } else {
          $(".answers .p_ans_el " + i).css("background", "#fff");
        }
      }
    }
  }

  $(".add_s").click(function() {
    sections.push({
      questions: [],
      text: "new section" + section_last_index
    });
    current_section_index = sections.length - 1;
    current_section = sections[current_section_index];
    reload();
    section_last_index++;
  });

  $(".add_q").click(function() {
      current_section.questions.push({
      text: "new question" + question_last_index,
      ans: []
    });
    current_question_index = current_section.questions.length - 1;
    current_question = current_section.questions[current_question_index];
    reload();
    question_last_index++;
  });

  $(".add_a").click(function() {
    current_question.ans.push({
      kind: "text",
      text_q: "Text question",
      text_a: "new answer" + answer_last_index,
      flag: false
    });
    reload();
    answer_last_index++;
  });
  $(".add_a_image").click(function() {
    current_question.ans.push({
      kind: "image",
      text_q: "Text question",
      flag: false ,
      image_a: placeholder_data,
      name: null
    });
    reload();
    // answer_last_index++;
  });
});
