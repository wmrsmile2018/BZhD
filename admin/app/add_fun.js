$(function() {
  var i_s = 0, i = 0, i_q = 0;
  // 27 - esc
  // 13 - enter
  var sections = [];
  var current_section_index = 0;
  var current_question_index = 0;
  var current_answer_index = 0;
  var current_section = null;
  var current_question = null;
  var section_last_index = 0;
  var question_last_index = 0;
  var answer_last_index = 0;
  var touch_time_s = 0;
  var touch_time_q = 0;
  var touch_time_a_t = 0;
  var touch_time_a_a = 0;

  function reload() {
    reloadNavigation(sections, current_section_index);
    reloadLeftMenu(current_section, current_question_index);
    reloadQuestionContent(current_question);
  }

  $(".section").on("click", ".s_el_t", function(e) {
    current_section_index = $(e.target).data("index");
    var tmp = current_section_index;
    $(".a_num_s_el" + tmp).css("background", "#e2e5de");
    current_section = sections[tmp];
    current_question = current_section.questions[0];
    console.log("click section");
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
    $(".a_num_q_el" + tmp).css("background", "#fff");
    current_question =  current_section.questions[tmp];
  });

  $(".questions").on("click", ".q_el input", (e) => {
    e.stopPropagation();
  });

  $(".questions").on("click", ".q_el", function(e) {
    current_question_index = $(e.target).data("index");//#c2cac7
    var tmp = current_question_index;
    $(".a_num_q_el" + tmp).css("background", "#fff");
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
        $(".q_el_num" + tmp).hide();
        $(".r_num_q_el" + tmp).before(input);
        $(".text_q" + tmp).keydown(function(e) {
          if(e.which == 13) {
            current_section.questions[tmp].text = $(".text_q" + tmp).val();
            $(".q_el_num" + tmp).show();
            $(".text_q" + tmp).hide();
            $(".a_num_q_el" + tmp).css("background", "#fff");
            current_question =  current_section.questions[tmp];
            reload();
          }
        });
      }
      touch_time_q = 0;
    }
  });

  $(".answers").on("click", ".text", (e) => {
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
        $(".text_t").keydown((e) => {
          if(e.which == 13) {
            current_question.ans[current_question_index].text_q = $(".text_t").val();
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
        $(".text_a" + tmp).keydown(function(e) {
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
      $(".a_num_q_el" + index).css("background", "#fff");
    }
  }

  function reloadQuestionContent(current_question) {
    $(".f_ans").remove();
    $(".text").remove();
    if(current_section.questions.length) {
      var div, a, span, p, input, text, form, div2;
      for(var i = 0; i < current_question.ans.length; i++) {
        div = document.createElement("div");
        div2 = document.createElement("div");
        a = document.createElement("a");
        span = document.createElement("span");
        p = document.createElement("p");
        input = document.createElement("input");
        text = document.createElement("div");
        form = document.createElement("form");

        input.type = "checkbox";
        input.value = "checkbox" + i;
        input.name = "ans" + i;

        if(!i) {
          $(form).addClass("f_ans");
          $(text).addClass("text").html(current_question.ans[i].text_q);
          $(".answers .add_a").before(text);
          $(".answers .add_a").before(form);
        }

        $(p).addClass("p_ans " + "p_ans_el" + i);
          // $(div2).addClass("s_el_t " +"s_el_num" + i).text(sections[i].text);
        $(div2).addClass("a_el_t " + "a_el_num" +i).text(current_question.ans[i].text_a);
        $(div).addClass("a_el " + "a_num_a_el" + i);
        $(div).data("index", i);
        $(div2).data("index", i);
        $(a).addClass("rem_a_el " + "r_num_a_el" + i);
        $(a).data("index", i);
        $(span).addClass("glyphicon glyphicon-minus");

        $(".f_ans").append(p);
        $(".p_ans_el" + i).append(input);
        $(".p_ans_el" + i).append(div);
        $(".a_num_a_el" + i).append(div2);
        $(".a_num_a_el" + i).append(a);
        $(".r_num_a_el" + i).append(span);
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
      text_q: "Text question",
      text_a: "new answer" + answer_last_index,
      flag: 0
    });
    reload();
    answer_last_index++;
  });
});
