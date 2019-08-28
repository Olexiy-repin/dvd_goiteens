$(".popup-with-form").magnificPopup({type:"inline",focus:"#name"});

$(document).ready(function() {
  var utm_source = getUrlParameter("utm_source");
  var utm_medium = getUrlParameter("utm_medium");
  var utm_term = getUrlParameter("utm_term");
  var utm_campaign = getUrlParameter("utm_campaign");
  var utm_content = getUrlParameter("utm_content");
  $("input[name=utm_source]").val(utm_source);
  $("input[name=utm_medium]").val(utm_medium);
  $("input[name=utm_term]").val(utm_term);
  $("input[name=utm_campaign]").val(utm_campaign);
  $("input[name=utm_content]").val(utm_content);

  console.log("ok");
  $('input[type="tel"]').mask("+38(999)999-99-99");

  function ValidMail(email, form) {
    var emailValue = email.value;
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var valid = re.test(emailValue);

    if (form.classList.contains("main__form")) {
      !valid
        ? (email.style.outline = "1px solid red")
        : (email.style.outline = "1px solid #000");
    } else if (form.classList.contains("modal-form")) {
      !valid
        ? (email.style.borderBottom = "1px solid red")
        : (email.style.borderBottom = "1px solid #000");
    }

    return valid;
  }

  function ValidPhone(phone, form) {
    var phoneValue = phone.value;
    var re = /(?:\w)(?:(?:(?:(?:\+?3)?8\W{0,5})?0\W{0,5})?[45679]\s?\d[^\w,;(\+]{0,5})?\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d(?!(\W?\d))/;
    var valid = re.test(phoneValue);

    if (form.classList.contains("main__form")) {
      !valid
        ? (phone.style.outline = "1px solid red")
        : (phone.style.outline = "1px solid #000");
    } else if (form.classList.contains("modal-form")) {
      !valid
        ? (phone.style.borderBottom = "1px solid red")
        : (phone.style.borderBottom = "1px solid #000");
    }

    return valid;
  }

  $("form").on("submit", function(e) {
    console.log("click");
    e.preventDefault();
    var emailValue = $(this).find('input[type="email"]')[0];
    var emailValid = ValidMail(emailValue, $(this)[0]);

    var telValue = $(this).find('input[type="tel"]')[0];
    var telValid = ValidPhone(telValue, $(this)[0]);

    if (emailValid && telValid) {
      $(".submit").prop("disabled", true);
      var allInput = this.querySelectorAll("input");

      allInput.forEach(el => (el.style.outline = "1px solid #000"));
      var $form = $(this);

      $.ajax({
        type: "POST",
        url: "../crm/registration.php",
        dataType: "json",
        data: $form.serialize(),
        success: function(response) {
          if (response.status == "success") {
            window.location.href = "../ok";
          }
        }
      });
    }
  });

  $(".scroll").click(function(e) {
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top - 80;

    $("body,html").animate(
      {
        scrollTop: top
      },
      1500
    );
  });

  $(".program-titles-tablet").click(function() {
    $(".program-titles-tablet .block-html-title-tablet").removeClass("active");
    $(this)
      .find(".block-html-title-tablet")
      .addClass("active");
    $(".program-titles_title-before").addClass("program-titles_title-none");
    $("#" + $(this).data("tab")).removeClass("program-titles_title-none");
  });
});

// script to get utm
function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}

let result = [...document.querySelectorAll(".video-play-link")];

function show(e) {
  let width = window.innerWidth;
  let frameWidth;
  switch (true) {
    case width < 768:
      frameWidth = 285;
      break;
    case width >= 768 && width < 1151:
      frameWidth = 315;
    case width >= 1151:
      frameWidth = 340;
    default:
      break;
  }
  let src = e.target.previousElementSibling.dataset.youtube;
  e.target.parentElement.innerHTML = `<iframe width="${frameWidth}" height="250" src="${src}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}
result.forEach(el => el.addEventListener("click", show));