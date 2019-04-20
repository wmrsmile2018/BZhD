$(function() {
  var i_s = 0, i = 0, i_q = 0;

  var sections = [];
  var current_section_index = 0;
  var current_question_index = 0;
  var current_section = null;
  var current_question = null;

  function reload() {
    reloadNavigation(sections, current_section_index);
    reloadLeftMenu(current_section, current_question_index);
    reloadQuestionContent(current_question);
  }

  $(".section").on("click", ".s_el", function(e) {
    current_section_index = $(e.target).data("index");
    $(".a_num_s_el" + current_section_index).css("background", "#e2e5de");
    current_section = sections[current_section_index];
    reload();
  });

  $(".questions").on("click", ".q_el", function(e) {
    current_question_index = $(e.target).data("index");
    console.log(current_question_index);
    $(".a_num_q_el" + current_question_index).css("background", "#c2cac7");
    current_question = current_section.questions[current_question_index];
    reload();
  });

  function reloadNavigation(sections, index) {
    var div, a, span, p;
    $(".s_el").remove();
    for(i = 0; i < sections.length; i++) {
      div = document.createElement("div");
      a = document.createElement("a");
      span = document.createElement("span");
      $(div).addClass("s_el " + "a_num_s_el" + i);
      $(div).data("index", i).html(sections[i].text);
      $(a).addClass("rem_s_el " + "r_num_s_el" + i);
      $(span).addClass("glyphicon glyphicon-minus");
      $(".section .add_s").before(div);
      $(".a_num_s_el" + i).append(a);
      $(".r_num_s_el" + i).append(span);
    }
      $(".a_num_s_el" + index).css("background", "#e2e5de");
  }


  function reloadLeftMenu(current_section, index) {
    $(".q_el").remove();
    if(sections.length) {
      var div, a, span;
      for(i = 0; i < current_section.questions.length; i++) {
        div = document.createElement("div");
        a = document.createElement("a");
        span = document.createElement("span");
        $(div).addClass("q_el " + "a_num_q_el" + i);
        $(div).data("index", i).html(current_section.questions[i].text);
        $(a).addClass("rem_q_el " + "r_num_q_el" + i);
        $(span).addClass("glyphicon glyphicon-minus");
        $(".questions .add_q").before(div);
        $(".a_num_q_el" + i).append(a);
        $(".r_num_q_el" + i).append(span);
      }
      $(".a_num_q_el" + index).css("background", "#c2cac7");
    }
  }

  function reloadQuestionContent(current_question) {
    $(".f_ans").remove();
    $(".text").remove();
    if(current_section.questions.length) {
      var div, a, span, p, input, text, form;
      for(i = 0; i < current_question.ans.length; i++) {
        div = document.createElement("div");
        a = document.createElement("a");
        span = document.createElement("span");
        p = document.createElement("p");
        input = document.createElement("input");
        text = document.createElement("div");
        form = document.createElement("form");

        input.type = "checkbox";
        input.value = "checkbox" + i;
        input.name = "ans" + i;
        input.class = "ins" + i;

        if(!i) {
          $(form).addClass("f_ans");
          $(text).addClass("text").html(current_question.ans[i].text_q);
          $(".answers .add_a").before(text);
          $(".answers .add_a").before(form);
        }

        $(p).addClass("p_ans " + "p_ans_el" + i);
        $(div).addClass("a_el " + "a_num_a_el" + i);
        $(div).data("index", i).html(current_question.ans[i].text_a);
        $(a).addClass("rem_a_el " + "r_num_a_el" + i);
        $(span).addClass("glyphicon glyphicon-minus");

        $(".f_ans").append(p);
        $(".p_ans_el" + i).append(input);
        $(".p_ans_el" + i).append(div);
        $(".a_num_a_el" + i).append(a);
        $(".r_num_a_el" + i).append(span);
      }
    }
  }
  $(".add_s").click(function() {
    sections.push({
      questions: [],
      text: "new section" + sections.length
    });
    current_section_index = sections.length - 1;
    current_section = sections[current_section_index];
    reload();
  });

  $(".add_q").click(function() {
      current_section.questions.push({
      text: "new question" + current_section.questions.length,
      ans: []
    });
    current_question_index = current_section.questions.length - 1;
    current_question = current_section.questions[current_question_index];
    reload();
  });

  $(".add_a").click(function() {
    current_question.ans.push({
      text_q: "Text question" + current_question.ans.length,
      text_a: "new answer",
      flag: 0
    });
    reload();
  });
});
