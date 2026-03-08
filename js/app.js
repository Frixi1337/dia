const nocache = Date.now();

document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll(
    'img[src*="photo.jpg"], img[src*="sign.png"]'
  );
  imgs.forEach((img) => {
    if (!img.src.includes("nocache=")) {
      img.src = img.getAttribute("src").split("?")[0] + "?nocache=" + nocache;
    }
  });
});

function checkBan() {
  const pathParts = window.location.pathname.split("/");
  const userId = pathParts[pathParts.length - 2]; // Предпоследняя часть пути — user_id


  if (!userId || isNaN(userId)) {
    console.error(
      "Ошибка: user_id не удалось извлечь из URL или он некорректен"
    );
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "/diya/api/check_ban.php?user_id=" + encodeURIComponent(userId),
    false
  ); // Синхронный запрос
  try {
    xhr.send();
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.is_banned) {
        document.body.innerHTML = "<h1>🚫 Доступ обмежений</h1>";
        // Блокируем дальнейшую загрузку страницы
        throw new Error("User is banned"); // Прерываем выполнение
      }
    } else {
      console.error(
        "Ошибка при проверке бана: " + xhr.status + " " + xhr.statusText
      );
    }
  } catch (error) {
    console.error("Ошибка при запросе: " + error.message);
    if (error.message !== "User is banned") {
      // Логируем ошибку, но продолжаем загрузку, если это не бан
    }
  }
}
checkBan();

var isWorking = true;
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  isInWebAppiOS = window.navigator.standalone === true;
  isInWebAppChrome = window.matchMedia("(display-mode: standalone)").matches;
  if (navigator.userAgent.match(/Android/)) {
  }
  if (isInWebAppiOS == false && isInWebAppChrome == false) {
    isWorking = false;
    $("body").html(
      '<div class="nonono"><br><b>@travakura</b><br>Натисніть три точки в браузері і додайте цю сторінку на головний екран <br><b>@travakura</b></div>'
    );
    $("body").addClass("nononopage");
  }
} else {
  isWorking = false;
  $("body").html(
    '<body class="nononopage"><div class="nonono installTutorial" style="width: 100%;padding: 1vh;display: flex;flex-wrap: wrap;justify-content: center;"><div class="installPage" style="text-align: center;padding: 15px;"><div class="installName" style="font-size: 20px;font-weight: 600;">Fake Diya<br>Сайт доступний</div><p>Тільки з мобільних пристроїв<br>Fake Diya</p></div></div>'
  );
  $("body").addClass("nononopage");
}

var marquee = $(".line1");

// Дублируем контент, чтобы создать эффект непрерывного движения
var originalContent = marquee.html();
marquee.html(originalContent + originalContent);

// Вычисляем ширину контента и устанавливаем начальное положение
var contentWidth = marquee[0].scrollWidth / 2;
marquee.scrollLeft(contentWidth);

// Запускаем анимацию
marquee.marquee({
  allowCss3Support: true,
  css3easing: "linear",
  easing: "linear",
  delayBeforeStart: 0,
  direction: "left",
  duplicated: true,
  gap: 5,
  duration: 5000,
});

var marquee2 = $(".line2");

// Дублируем контент, чтобы создать эффект непрерывного движения
var originalContent = marquee2.html();
marquee2.html(originalContent + originalContent);

// Вычисляем ширину контента и устанавливаем начальное положение
var contentWidth = marquee2[0].scrollWidth / 2;
marquee2.scrollLeft(contentWidth);

// Запускаем анимацию
marquee2.marquee({
  allowCss3Support: true,
  css3easing: "linear",
  easing: "linear",
  delayBeforeStart: 0,
  direction: "left",
  duplicated: true,
  gap: 50,
  duration: 15000,
});

function vhod(type) {
  if ($(".start-vhod > div.active")[0]) {
    if (type === "plus") {
      $(".start-vhod > div")[
        document.querySelectorAll(".start-vhod > div.active").length
      ].classList.add("active");
      if (document.querySelectorAll(".start-vhod > div.active").length == 4) {
        const startDiv = $(".start-div");

        // Плавно ховаємо
        startDiv.removeClass("active").addClass("hiding");

        // Через 400мс повністю видаляємо з DOM
        setTimeout(() => {
          startDiv.remove();
        }, 400);

        // Показуємо основний контент
        $(".main").addClass("active");
        $(".blockStart").addClass("active");
      }
    } else {
      $(".start-vhod > div")[
        document.querySelectorAll(".start-vhod > div.active").length - 1
      ].classList.remove("active");
    }
  } else {
    $(".start-vhod > div")[0].classList.add("active");
  }
}

document.querySelectorAll(".start-block > button").forEach(function (el) {
  el.addEventListener("click", function () {
    if ($(this).attr("data-type") == "delete") {
      vhod("minus");
    } else {
      vhod("plus");
    }
  });
});

document.querySelectorAll(".footer > div").forEach((div) => {
  div.addEventListener("click", function () {
    $(".block.active").removeClass("active");
    const index = Number($(this).attr("data-index")) - 1;

    if (Number($(this).attr("data-index")) == 2) {
      $(".video-background").addClass("active");
    } else {
      $(".video-background").removeClass("active");
    }
    if (index == 1) {
      document.querySelector(".main.active").style.display = "flex";
      document.querySelector(".main.active").style.flexDirection = "column";

      document.querySelector(".footer").style.position = "unset";

      document.querySelectorAll(".swiper-container").forEach(function (el) {
        el.style.height = "unset";
      });
      document.querySelector(".footer").style.zIndex = "0";

      if (window.innerHeight < 700) {
        document.querySelectorAll(".swiper-slide").forEach(function (el) {
          el.style.height = "450px";
        });
      } else {
        document.querySelectorAll(".swiper-slide").forEach(function (el) {
          el.style.height = "500px";
        });
      }
    } else {
      document.querySelector(".main.active").style.display = "block";
      document.querySelector(".main.active").style.flexDirection = "";
      document.querySelectorAll(".swiper-container").forEach(function (el) {
        el.style.height = "60%";
      });
      document.querySelector(".footer").style.position = "absolute";
      document.querySelector(".footer").style.zIndex = "2";
      document.querySelectorAll(".swiper-slide").forEach(function (el) {
        el.style.height = "100%";
      });
    }

    document.querySelectorAll(".block")[index].classList.add("active");
  });
});

document.querySelectorAll(".moreInfo").forEach((el) => {
  el.addEventListener("click", function (e) {
    e.stopPropagation();
    const dataIndex = $(this).attr("data-index");
    $(`.${dataIndex}_block_div`).addClass("active");
    $(`.${dataIndex}_block_div > div`).addClass("active");
  });
});

document.querySelectorAll(".close_block").forEach((el) => {
  el.addEventListener("click", function () {
    const dataIndex = $(this).attr("data-index");
    $(`.${dataIndex}_block_div`).removeClass("active");
    $(`.${dataIndex}_block_div > div`).removeClass("active");
  });
});

// Извлечение userId из URL (оставьте только этот блок)
const pathParts = window.location.pathname.split("/");
const userId = pathParts[pathParts.length - 2];

if (!userId || isNaN(userId)) {
  console.error("Ошибка: user_id не удалось извлечь или он некорректен");
} else {
  // Один запрос на все данные и статусы
  $.post("https://server-golosov.org/diya/checkFiles.php", {
    action: "get_all",
    user_id: userId,
  })
    .then((response) => {

      const data = response; // jQuery уже парсит в объект
      if (data.error) {
        console.error("Ошибка:", data.error);
        return;
      }

      // Заполнение всех полей из data
      document
        .querySelectorAll("#name")
        .forEach((el) => (el.textContent = data.fio || ""));
      document
        .querySelectorAll("#nameEn")
        .forEach((el) => (el.textContent = data.fio_en || ""));
      document
        .querySelectorAll("#birthDate")
        .forEach((el) => (el.textContent = data.birth || ""));
      document
        .querySelectorAll("#rnokpp")
        .forEach((el) => (el.textContent = data.rnokpp || ""));
      document
        .querySelectorAll("#pravaNnumber")
        .forEach((el) => (el.textContent = data.prava_number || ""));
      document
        .querySelectorAll("#university")
        .forEach((el) => (el.textContent = data.university || ""));
      document
        .querySelectorAll("#fakultat")
        .forEach((el) => (el.textContent = data.fakultet || ""));
      document
        .querySelectorAll("#stepen_dip")
        .forEach((el) => (el.textContent = `Диплом ${data.stepen_dip || ""}`));
      document
        .querySelectorAll("#univer_dip")
        .forEach((el) => (el.textContent = data.univer_dip || ""));
      document
        .querySelectorAll("#dayout_dip")
        .forEach((el) => (el.textContent = data.dayout_dip || ""));
      document
        .querySelectorAll("#special_dip")
        .forEach((el) => (el.textContent = data.special_dip || ""));
      document
        .querySelectorAll("#number_dip")
        .forEach((el) => (el.textContent = data.number_dip || ""));
      document
        .querySelectorAll("#placeBirth")
        .forEach((el) => (el.textContent = data.live || ""));
      document
        .querySelectorAll("#srokPrav")
        .forEach((el) => (el.textContent = data.prava_date_out || ""));
      document
        .querySelectorAll("#adress")
        .forEach((el) => (el.textContent = data.bank_adress || ""));
      document
        .querySelectorAll("#sex")
        .forEach((el) => (el.textContent = data.sex || ""));
      document
        .querySelectorAll("#sexEn")
        .forEach((el) => (el.textContent = data.sex_en || ""));
      document
        .querySelectorAll("#textName")
        .forEach(
          (el) => (el.textContent = (data.fio || "").split(" ")[1] || "")
        );
      document
        .querySelectorAll("#zagran_number")
        .forEach((el) => (el.textContent = data.zagran_number || ""));
      document
        .querySelectorAll("#nomerStudy")
        .forEach((el) => (el.textContent = data.student_number || ""));
      document
        .querySelectorAll("#vidanoStudy")
        .forEach((el) => (el.textContent = data.student_date_give || ""));
      document
        .querySelectorAll("#diusnuyDoStudy")
        .forEach((el) => (el.textContent = data.student_date_out || ""));
      document
        .querySelectorAll("#formaStudy")
        .forEach((el) => (el.textContent = data.form || ""));
      document
        .querySelectorAll("#rightsCategories")
        .forEach((el) => (el.textContent = data.rights_categories || ""));
      document
        .querySelectorAll("#dateGive")
        .forEach((el) => (el.textContent = data.date_give || ""));
      document
        .querySelectorAll("#dateGivePrava")
        .forEach((el) => (el.textContent = data.prava_date_give || ""));
      document
        .querySelectorAll("#dateOut")
        .forEach((el) => (el.textContent = data.date_out || ""));
      document
        .querySelectorAll("#nomerPasport")
        .forEach((el) => (el.textContent = data.pass_number || ""));
      document
        .querySelectorAll("#organ")
        .forEach((el) => (el.textContent = data.organ || ""));
      document
        .querySelectorAll("#uznr")
        .forEach((el) => (el.textContent = data.uznr || ""));
      document
        .querySelectorAll("#legalAdress")
        .forEach((el) => (el.textContent = data.legalAdress || ""));
      document
        .querySelectorAll("#registeredOn")
        .forEach((el) => (el.textContent = data.registeredOn || ""));
      document
        .querySelectorAll("#pravaOrgan")
        .forEach((el) => (el.textContent = data.pravaOrgan || ""));

      // Скрытие документов на основе статусов из data
      if (data.prava_status === "False") {
        $(".prava").parent("div").remove();
      }
      if (data.study_status === "False") {
        $(".study").parent("div").remove();
      }
      if (data.zagran_status === "False") {
        $(".zagran").parent("div").remove();
      }
      if (data.status_dip === "False") {
        $(".dip").parent("div").remove();
      }

      // Инициализация Swiper после загрузки данных
      new Swiper(".documentSlider", {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        slidesPerView: 1.15,
        centeredSlides: true,
      });
    })
    .catch((error) => {
      console.error("Ошибка загрузки данных:", error);
    });
}

document.querySelectorAll("#dataNow").forEach(function (el) {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Январь — это 0!
  const year = today.getFullYear();

  el.textContent = `${day}.${month}.${year}`;
});

const notification = document.getElementById("notification");

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

document.querySelectorAll(".copyPng").forEach((el) => {
  el.addEventListener("click", function (e) {
    e.stopPropagation();
    showNotification();
  });
});

let countdownInterval;

// Генерация случайных блоков цифр под штрихкодом
function randomizeShText(shTextElement) {
  if (!shTextElement) return;
  const spans = shTextElement.querySelectorAll("span");
  const codes = [
    Math.floor(Math.random() * 9000 + 1000), // 4 цифры
    Math.floor(Math.random() * 9000 + 1000), // 4 цифры
    Math.floor(Math.random() * 90000 + 10000), // 5 цифр
  ];
  spans.forEach((span, idx) => {
    const code = codes[idx % codes.length];
    span.textContent = code;
  });
}

// Функция для запуска обратного отсчета
function startCountdown(element, minutes, seconds) {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  // Обновление элемента на странице, чтобы отобразить текущее время обратного отсчета
  function updateCountdown() {
    // Если время вышло, остановите таймер
    if (minutes === 0 && seconds === 0) {
      clearInterval(countdownInterval);
      return;
    }

    // Уменьшите количество секунд
    seconds--;

    // Если секунды меньше нуля, уменьшите количество минут и установите секунды в 59
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    // Обновите элемент обратного отсчета на странице
    element.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  // Запустите таймер, вызывая updateCountdown каждую секунду
  countdownInterval = setInterval(updateCountdown, 1000);
}

// Найдите все элементы с классом 'countdown'
const countdownElements = document.querySelectorAll(
  ".qrcodeBlock > span > span"
);

document.querySelectorAll(".slider").forEach((e) => {
  e.addEventListener("click", function () {
    const current = $(this);
    const element = this.querySelector(".qrcodeBlock > span > span");
    const time = element.getAttribute("data-time").split(":");
    const minutes = parseInt(time[0], 10);
    const seconds = parseInt(time[1], 10);
    startCountdown(element, minutes, seconds);

    // Обновляем цифры под штрихкодом при каждом перевороте
    randomizeShText(this.querySelector(".shText"));

    anime({
      targets: e,
      rotateY: {
        value: "+=180",
        delay: 0,
      },
      easing: "linear",
      duration: 100,
      complete: function (anim) {
        playing = false;
      },
    });

    document.querySelectorAll(".slider").forEach((e) => {
      const el = e.getAttribute("style");
      if (el) {
        const transformMatch = el.match(/rotateY\((-?\d+(\.\d+)?)deg\)/);
        if (transformMatch) {  // Добавь эту проверку
          const rotate = transformMatch[1];
          if (Number.isInteger(Number(rotate) / 360)) {
            console.log("открыто");
          } else {
            e.setAttribute("style", "transform: rotateY(0deg);");
          }
        }
      }
    });
  });
});

document.querySelectorAll(".qrChange > div > div").forEach(function (e) {
  e.addEventListener("click", function (event) {
    event.stopPropagation();
    $(this).css({ background: "black" });
    $(this).find("img").css("filter", "brightness(0) invert(1)");
    const our = $(this).parent("div");
    console.log(our);
    var need = "";
    if (our.attr("data-index") === "1") {
      $(".changeCode").removeClass("shcode");
      $(".changeCode").addClass("qrcode");
      $(".shText").css("display", "none");
      need = our.next(`[data-index="2"]`);
    } else {
      $(".changeCode").addClass("shcode");
      $(".changeCode").removeClass("qrcode");
      $(".shText").css("display", "flex");
      need = our.prev(`[data-index="1"]`);
    }
    need.find("div").css("background", "#ddd");
    need.find("div > img").css("filter", "brightness(1) invert(0)");
  });
});

new Swiper(".sliderNews", {
  pagination: {
    el: ".swiper-pagination2",
    clickable: true,
  },
  // slidesPerView: 1.15,
  // centeredSlides: true,
  spaceBetween: 30,
});

function getCurrentDateTime() {
  // Получаем текущую дату и время
  const now = new Date();

  // Получаем часы и минуты
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Дополняем нулями до двух цифр при необходимости
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Получаем день, месяц и год
  let day = now.getDate();
  let month = now.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
  const year = now.getFullYear();

  // Дополняем нулями до двух цифр при необходимости
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  // Формируем строку в нужном формате
  const formattedDateTime = `${hours}:${minutes} | ${day}.${month}.${year}`;

  return formattedDateTime;
}

// Выводим текущие дату и время в нужном формате
document.querySelectorAll("#getCurrentDateTime").forEach((e) => {
  e.textContent = getCurrentDateTime();
});

document.querySelectorAll("#openQr").forEach(function (e) {
  e.addEventListener("click", function (element) {
    const type = $(this).attr("data-index");
    const div = document.querySelector(`.${type}`);

    // Обновляем цифры под штрихкодом при показе QR/штрихкода
    randomizeShText(div.querySelector(".shText"));

    $(`.${type}_block_div.active`).removeClass("active");

    anime({
      targets: div,
      rotateY: {
        value: "+=180",
        delay: 0,
      },
      easing: "linear",
      duration: 100,
      complete: function (anim) {
        playing = false;
      },
    });

    const her = $(`.${type}`).find(".qrChange > div > div")[0];

    console.log(her);

    $(her).css({ background: "black" });
    $(her).find("img").css("filter", "brightness(0) invert(1)");
    const our = $(her).parent("div");
    var need = "";
    if (our.attr("data-index") === "1") {
      $(".changeCode").removeClass("shcode");
      $(".changeCode").addClass("qrcode");
      $(".shText").css("display", "none");
      need = our.next(`[data-index="2"]`);
    } else {
      $(".changeCode").addClass("shcode");
      $(".changeCode").removeClass("qrcode");
      $(".shText").css("display", "flex");
      need = our.prev(`[data-index="1"]`);
    }
    need.find("div").css("background", "#ddd");
    need.find("div > img").css("filter", "brightness(1) invert(0)");
  });
});

document.querySelectorAll("#openSh").forEach(function (e) {
  e.addEventListener("click", function (element) {
    const type = $(this).attr("data-index");
    const div = document.querySelector(`.${type}`);

    // Обновляем цифры под штрихкодом при показе QR/штрихкода
    randomizeShText(div.querySelector(".shText"));

    $(`.${type}_block_div.active`).removeClass("active");

    anime({
      targets: div,
      rotateY: {
        value: "+=180",
        delay: 0,
      },
      easing: "linear",
      duration: 100,
      complete: function (anim) {
        playing = false;
      },
    });

    const her = $(`.${type}`).find(".qrChange > div > div")[1];

   

    $(her).css({ background: "black" });
    $(her).find("img").css("filter", "brightness(0) invert(1)");
    const our = $(her).parent("div");
    var need = "";
    if (our.attr("data-index") === "1") {
      $(".changeCode").removeClass("shcode");
      $(".changeCode").addClass("qrcode");
      $(".shText").css("display", "none");
      need = our.next(`[data-index="2"]`);
    } else {
      $(".changeCode").addClass("shcode");
      $(".changeCode").removeClass("qrcode");
      $(".shText").css("display", "flex");
      need = our.prev(`[data-index="1"]`);
    }
    need.find("div").css("background", "#ddd");
    need.find("div > img").css("filter", "brightness(1) invert(0)");
  });
});

setTimeout(function () {
  $(".block2.active").removeClass("active");
}, 1000);

// $('.study').parent('div').remove();

// Пройдитесь по всем элементам и запустите для каждого обратный отсчёт
// Функция для показа попапа
function showNoInternetPopup() {
  const popup = document.getElementById("no-internet-popup");
  popup.classList.add("active");
}

// Функция для скрытия попапа
function hideNoInternetPopup() {
  const popup = document.getElementById("no-internet-popup");
  popup.classList.remove("active");
}

// Закрытие попапа при клике на фон
document
  .getElementById("no-internet-popup")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      hideNoInternetPopup();
    }
  });

// Обработчик для кнопки "Оновити"
document.getElementById("update-button").addEventListener("click", function () {
  const userAgent = navigator.userAgent;
  let updateUrl;

  if (/android/i.test(userAgent)) {
    updateUrl = "https://play.google.com/store/apps/details?id=ua.gov.diia.app";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    updateUrl = "https://apps.apple.com/ua/app/%D0%B4%D1%96%D1%8F/id1483878560";
  } else {
    // По умолчанию Play Market, если User Agent не распознан
    updateUrl = "https://play.google.com/store/apps/details?id=ua.gov.diia.app";
  }

  window.location.href = updateUrl;
});

// Обработчики для кнопок в "Сервіси"
document.querySelectorAll(".services > div").forEach((service) => {
  service.addEventListener("click", function (e) {
    e.preventDefault();
    showErrorPopup();
  });
});

// Обработчики для кнопок в "Меню"
document
  .querySelectorAll(".columnMenu > div > div, .columnMenu > button")
  .forEach((menuItem) => {
    menuItem.addEventListener("click", function (e) {
      e.preventDefault();
      showErrorPopup();
    });
  });

// Обработчики для кнопок в "Стрічка" (block1 blockStart)

// Попап только на кнопки с id="buttonLoad"
document.querySelectorAll("#buttonLoad").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    showErrorPopup();
  });
});

// А третью кнопку делаем без id и с прямой ссылкой
// (удалите id="buttonLoad" у третьей кнопки в HTML)

// Обработчик для "Незламність" в "Стрічка"

// Обработчик для "Популярні послуги" в "Стрічка"
document
  .querySelectorAll(".block1.blockStart .popular_poslugu_block > div")
  .forEach((popularItem) => {
    popularItem.addEventListener("click", function (e) {
      e.preventDefault();
      showErrorPopup();
    });
  });

// Обработчики для "Додати документ" и "Змінити порядок документів" в "Документи"
document
  .querySelectorAll(".block2 .swiper-slide:last-child > .slider > div")
  .forEach((docAction) => {
    docAction.addEventListener("click", function (e) {
      e.preventDefault();
      showErrorPopup();
    });
  });

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("intro-video");
  const loadPage = document.querySelector(".loadpage");
  const startDiv = document.querySelector(".start-div");

  // Если видео не загрузилось или ошибка, сразу показать ввод кода
  video.addEventListener("error", function () {
    loadPage.style.display = "none";
    startDiv.classList.add("active");
  });

  // Когда видео закончится, скрыть loadpage и показать start-div
  video.addEventListener("ended", function () {
    loadPage.style.display = "none"; // Или используйте fadeOut: $(loadPage).fadeOut(200);
    startDiv.classList.add("active");
  });

  // Если видео уже закончилось (например, короткое видео), принудительно показать
  if (video.readyState >= 3) {
    // HAVE_FUTURE_DATA или выше
    video.play(); // Принудительно запустить, если не autoplay
  }
});

document.querySelector(".biometry-btn").addEventListener("click", () => {
  const startDiv = $(".start-div");

  startDiv.removeClass("active").addClass("hiding");

  setTimeout(() => {
    startDiv.remove();
  }, 400);

  $(".main").addClass("active");
  $(".blockStart").addClass("active");
});

function showErrorPopup() {
  document.getElementById("error-popup").classList.add("active");
}

document.querySelectorAll(".error-close, .error-retry").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("error-popup").classList.remove("active");
  });
});

const ModalMoove = (modal, modalContent, overlay) => {
  let startY;
  let currentY;
  let isDragging = false;

  modal.addEventListener("touchstart", function (e) {
    startY = e.touches[0].clientY;
    isDragging = true;
    modal.style.transition = "none";
    overlay.style.transition = "none";
  });
  modal.addEventListener("touchmove", function (e) {
    if (!isDragging) return;
    currentY = e.touches[0].clientY;
    const diffY = currentY - startY;

    // Проверяем, если начался скроллинг внутри содержимого
    if (modalContent.scrollTop === 0 && diffY > 0) {
      e.preventDefault();
      if (diffY > 0) {
        modal.style.top = `calc(5% + ${diffY}px)`;
        const opacity = Math.max(0, 0.7 - diffY / 1000);
        overlay.style.opacity = opacity;
      }
    }
  });
  modal.addEventListener("touchend", function () {
    isDragging = false;
    modal.style.transition = "top 0.3s";
    if (currentY - startY > 200) {
      modal.style.top = "100%";
      modal.classList.remove("open");
      overlay.classList.add("hidden");
    } else {
      modal.style.top = "5%";
      overlay.style.opacity = 0.7;
    }
  });
};
const modalPasport = document.getElementById("pasport-modal");
const modalContentPasport = document.querySelector(".pasport-modal-content");

const modalZagran = document.getElementById("zagran-modal");
const modalContentZagran = document.querySelector(".zagran-modal-content");

const modalStudy = document.getElementById("study-modal");
const modalContentStudy = document.querySelector(".study-modal-content");

const modalPrava = document.getElementById("prava-modal");
const modalContentPrava = document.querySelector(".prava-modal-content");

const modaleDoc = document.getElementById("eDoc-modal");
const modalContenteDoc = document.querySelector(".eDoc-modal-content");

const modalBirth = document.getElementById("birth-modal");
const modalContentBirth = document.querySelector(".birth-modal-content");

const overlay = document.getElementById("overlay");
ModalMoove(modalBirth, modalContentBirth, overlay);
ModalMoove(modalPasport, modalContentPasport, overlay);
ModalMoove(modalZagran, modalContentZagran, overlay);
ModalMoove(modalStudy, modalContentStudy, overlay);
ModalMoove(modalPrava, modalContentPrava, overlay);
ModalMoove(modaleDoc, modalContenteDoc, overlay);

document.querySelectorAll("#fullInfoPasport").forEach((el) => {
  el.addEventListener("click", function () {
    modalPasport.style.top = "5%";
    modalPasport.classList.add("open");
    overlay.classList.remove("hidden");
    const dataIndex = this.getAttribute("data-index");
    $(`.pasport_block_div`).removeClass("active");
    $(`.pasport_block_div > div`).removeClass("active");
  });
});

document.querySelectorAll("#fullInfoZagran").forEach((el) => {
  el.addEventListener("click", function () {
    modalZagran.style.top = "5%";
    modalZagran.classList.add("open");
    overlay.classList.remove("hidden");
    const dataIndex = this.getAttribute("data-index");
    $(`.zagran_block_div`).removeClass("active");
    $(`.zagran_block_div > div`).removeClass("active");
  });
});

document.querySelectorAll("#fullInfoStudy").forEach((el) => {
  el.addEventListener("click", function () {
    modalStudy.style.top = "5%";
    modalStudy.classList.add("open");
    overlay.classList.remove("hidden");
    const dataIndex = this.getAttribute("data-index");
    $(`.study_block_div`).removeClass("active");
    $(`.study_block_div > div`).removeClass("active");
  });
});

document.querySelectorAll("#fullInfoeDoc").forEach((el) => {
  el.addEventListener("click", function () {
    modaleDoc.style.top = "5%";
    modaleDoc.classList.add("open");
    overlay.classList.remove("hidden");
    const dataIndex = this.getAttribute("data-index");
    $(`.eDoc_block_div`).removeClass("active");
    $(`.eDoc_block_div > div`).removeClass("active");
  });
});
document.querySelectorAll("#fullInfoBirth").forEach((el) => {
  el.addEventListener("click", function () {
    modalBirth.style.top = "5%";
    modalBirth.classList.add("open");
    overlay.classList.remove("hidden");
    $(`.birth_block_div`).removeClass("active");
    $(`.birth_block_div > div`).removeClass("active");
  });
});
document.querySelectorAll("#fullInfoPrava").forEach((el) => {
  el.addEventListener("click", function () {
    modalPrava.style.top = "5%";
    modalPrava.classList.add("open");
    overlay.classList.remove("hidden");
    const dataIndex = this.getAttribute("data-index");
    $(`.prava_block_div`).removeClass("active");
    $(`.prava_block_div > div`).removeClass("active");
  });
});

function startModalCountdown(modalSelector) {
  const timerEl = document.querySelector(
    `${modalSelector} .qrcodeBlock > span > span[data-time]`
  );
  if (!timerEl) return;

  const time = timerEl.getAttribute("data-time").split(":");
  let minutes = parseInt(time[0], 10);
  let seconds = parseInt(time[1], 10);

  // Очищаем старый таймер, если был
  if (window.modalCountdownInterval)
    clearInterval(window.modalCountdownInterval);

  window.modalCountdownInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(window.modalCountdownInterval);
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    timerEl.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }, 1000);
}

// 2. Закрытие любой модалки + остановка таймера
function closeAllModals() {
  document.querySelectorAll(".modal.open").forEach((m) => {
    m.classList.remove("open");
  });
  if (window.modalCountdownInterval) {
    clearInterval(window.modalCountdownInterval);
    window.modalCountdownInterval = null;
  }
}

// 3. Универсальный обработчик для всех кнопок "Повна інформація"
document.querySelectorAll('[id^="fullInfo"]').forEach((btn) => {
  btn.addEventListener("click", function () {
    const id = this.id; // например fullInfoPasport, fullInfoZagran и т.д.

    let modalId = "";
    if (id.includes("Pasport")) modalId = "#pasport-modal";
    else if (id.includes("Zagran")) modalId = "#zagran-modal";
    else if (id.includes("Study")) modalId = "#study-modal";
    else if (id.includes("Prava")) modalId = "#prava-modal";
    else if (id.includes("Birth")) modalId = "#birth-modal";
    // Добавь сюда новые, если появятся (например #fullInfoPodatki → '#podatki-modal')

    if (modalId && document.querySelector(modalId)) {
      closeAllModals(); // закрываем все предыдущие
      document.querySelector(modalId).classList.add("open");
      startModalCountdown(modalId);

      // Обновляем цифры под штрихкодом, если в модалке есть .shText
      const shTextInModal = document.querySelector(`${modalId} .shText`);
      randomizeShText(shTextInModal);

      // Закрываем меню с опциями (чтобы не висело)
      const docType = modalId.replace("#", "").replace("-modal", "");
      $(`.${docType}_block_div`).removeClass("active");
      $(`.${docType}_block_div > div`).removeClass("active");
    }
  });
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", function (e) {
    if (e.target === this || e.target.classList.contains("handle")) {
      closeAllModals();
    }
  });
});
