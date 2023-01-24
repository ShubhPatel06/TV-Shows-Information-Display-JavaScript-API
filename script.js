const api_url = "https://api.tvmaze.com/shows";

async function getShow() {
  const response = await fetch(api_url);

  const shows = await response.json();

  let card = "";
  shows.map((show) => {
    card +=
      '<div class="col"><div class="card" style="width:310px"><img src="' +
      show.image.medium +
      '" class="card-img-top " alt="Show Poster" style="height:300px"/><div class="card-body"><h5 class="card-title">' +
      show.name +
      '</h5><p class="card-text">Rating: ' +
      show.rating.average +
      "</p><button type='button' id='info' class='btn btn-primary info' data-bs-toggle='modal' data-bs-target='#exampleModal' value=" +
      show.id +
      ">Show info</button></div></div></div>";
  });

  document.getElementById("cards").innerHTML = card;

  const btns = document.querySelectorAll(".info");

  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = btn.value;
      const infoURL = "https://api.tvmaze.com/shows/" + id + "?embed=cast";

      async function getShowInfo() {
        const showResponse = await fetch(infoURL);

        const showInfo = await showResponse.json();

        let modal = "";
        modal +=
          '<div class="modal-content text-bg-dark"><div class="modal-header"><h1 class="modal-title fs-5" id="exampleModalLabel">' +
          showInfo.name +
          '</h1><button  type="button"  class="btn-close"  data-bs-dismiss="modal"  aria-label="Close"></button></div><div class="modal-body"><div class="container row"><div class="img-box col"><img src="' +
          showInfo.image.original +
          '" class="w-100"></div><div class="text-box col"><h2 class="mb-3 fs-1">' +
          showInfo.name +
          "</h2><p class='mb-3'>" +
          showInfo.summary +
          "</p><p class='mb-3 fs-5'><span class='fw-bold'>Genres: </span>" +
          showInfo.genres +
          "</p><p class='mb-3 fs-5'><span class='fw-bold'>Network: </span>" +
          showInfo.network.name +
          "</p><p class='mb-3 fs-5'><span class='fw-bold'>Status: </span>" +
          showInfo.status +
          "</p><p class='mb-3 fs-5'><span class='fw-bold'>Schedule: </span>" +
          showInfo.schedule.days +
          " - " +
          showInfo.schedule.time +
          "</p><p class='mb-3 fs-5'><span class='fw-bold'>Cast: </span>" +
          showInfo._embedded.cast.map((item) => item.person.name) +
          "</p></div></div></div></div>";

        document.getElementById("dialog").innerHTML = modal;
      }
      getShowInfo();
    });
  });
}

const home = document.getElementById("home");
home.addEventListener("click", function () {
  getShow();
  searchBox.value = "";
});

const autoSearch = document.getElementById("searchBox");
autoSearch.addEventListener("input", searchAutomatic);

const btn = document.getElementById("btn");
btn.addEventListener("click", searchAutomatic);

// function showSearch() {
//   const searchBox = document.querySelector(".searchBox");
//   const val = searchBox.value;

//   let error = 0;
//   if (val === "") {
//     error++;
//   } else {
//     const search_url = "https://api.tvmaze.com/search/shows?q=" + val;

//     async function getSearch() {
//       const searchResponse = await fetch(search_url);

//       const searches = await searchResponse.json();

//       let card = "";
//       searches.map((search) => {
//         const rating = search.show.rating.average ?? "No ratings";

//         function checkImage() {
//           if (search.show.image !== null) {
//             return search.show.image.medium;
//           } else {
//             return "";
//           }
//         }
//         card +=
//           '<div class="col"><div class="card" style="width:300px"><img src="' +
//           checkImage() +
//           '" class="card-img-top " alt="No poster" style="height:300px"/><div class="card-body"><h5 class="card-title">' +
//           search.show.name +
//           '</h5><p class="card-text">Rating: ' +
//           rating +
//           "</p><button type='button' id='info' class='btn btn-primary info' data-bs-toggle='modal' data-bs-target='#exampleModal' value=" +
//           search.show.id +
//           ">Show info</button></div></div></div>";
//       });

//       document.getElementById("cards").innerHTML = card;

//       const btns = document.querySelectorAll(".info");

//       btns.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const id = btn.value;
//           const infoURL = "https://api.tvmaze.com/shows/" + id + "?embed=cast";

//           async function getShowInfo() {
//             const showResponse = await fetch(infoURL);

//             const showInfo = await showResponse.json();

//             function checkNetwork() {
//               if (showInfo.network !== null) {
//                 return showInfo.network.name;
//               } else {
//                 return "No network";
//               }
//             }

//             function checkImage() {
//               if (showInfo.image !== null) {
//                 return showInfo.image.original;
//               } else {
//                 return "";
//               }
//             }

//             function checkGenres() {
//               if (showInfo.genres.length !== 0) {
//                 return showInfo.genres;
//               } else {
//                 return "N/A";
//               }
//             }

//             function checkScheduleDays() {
//               if (showInfo.schedule.days.length !== 0) {
//                 return showInfo.schedule.days;
//               } else {
//                 return "N/A";
//               }
//             }

//             function checkScheduleTime() {
//               if (showInfo.schedule.time !== "") {
//                 return showInfo.schedule.time;
//               } else {
//                 return "N/A";
//               }
//             }

//             function checkCast() {
//               if (showInfo._embedded.cast.length !== 0) {
//                 return showInfo._embedded.cast.map((item) => item.person.name);
//               } else {
//                 return "N/A";
//               }
//             }

//             let modal = "";
//             modal +=
//               '<div class="modal-content text-bg-dark"><div class="modal-header"><h1 class="modal-title fs-5" id="exampleModalLabel">' +
//               showInfo.name +
//               '</h1><button  type="button"  class="btn-close"  data-bs-dismiss="modal"  aria-label="Close"></button></div><div class="modal-body"><div class="container row"><div class="img-box col"><img src="' +
//               checkImage() +
//               '" class="w-100"></div><div class="text-box col"><h2 class="mb-3 fs-1">' +
//               showInfo.name +
//               "</h2><p class='mb-3'>" +
//               showInfo.summary +
//               "</p><p class='mb-3 fs-5'><span class='fw-bold'>Genres: </span>" +
//               checkGenres() +
//               "</p><p class='mb-3 fs-5'><span class='fw-bold'>Network: </span>" +
//               checkNetwork() +
//               "</p><p class='mb-3 fs-5'><span class='fw-bold'>Status: </span>" +
//               showInfo.status +
//               "</p><p class='mb-3 fs-5'><span class='fw-bold'>Schedule: </span>" +
//               checkScheduleDays() +
//               " - " +
//               checkScheduleTime() +
//               "</p><p class='mb-3 fs-5'><span class='fw-bold'>Cast: </span>" +
//               checkCast() +
//               "</p></div></div></div></div>";

//             document.getElementById("dialog").innerHTML = modal;
//           }
//           getShowInfo();
//         });
//       });
//     }

//     getSearch();
//   }

//   if (error > 0) {
//     searchBox.placeholder = "Please type something";
//   }
// }

function searchAutomatic() {
  let search_query = document.getElementById("searchBox").value;

  const search_url = "https://api.tvmaze.com/search/shows?q=" + search_query;

  if (search_query === "") {
    getShow();
  } else {
    async function getSearch() {
      const searchResponse = await fetch(search_url);

      const searches = await searchResponse.json();

      let card = "";
      searches.map((search) => {
        const rating = search.show.rating.average ?? "No ratings";

        function checkImage() {
          if (search.show.image !== null) {
            return search.show.image.medium;
          } else {
            return "";
          }
        }
        card +=
          '<div class="col"><div class="card" style="width:310px"><img src="' +
          checkImage() +
          '" class="card-img-top " alt="No poster" style="height:300px"/><div class="card-body"><h5 class="card-title">' +
          search.show.name +
          '</h5><p class="card-text">Rating: ' +
          rating +
          "</p><button type='button' id='info' class='btn btn-primary info' data-bs-toggle='modal' data-bs-target='#exampleModal' value=" +
          search.show.id +
          ">Show info</button></div></div></div>";
      });

      document.getElementById("cards").innerHTML = card;

      const btns = document.querySelectorAll(".info");

      btns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = btn.value;
          const infoURL = "https://api.tvmaze.com/shows/" + id + "?embed=cast";

          async function getShowInfo() {
            const showResponse = await fetch(infoURL);

            const showInfo = await showResponse.json();

            function checkNetwork() {
              if (showInfo.network !== null) {
                return showInfo.network.name;
              } else {
                return "No network";
              }
            }

            function checkImage() {
              if (showInfo.image !== null) {
                return showInfo.image.original;
              } else {
                return "";
              }
            }

            function checkGenres() {
              if (showInfo.genres.length !== 0) {
                return showInfo.genres;
              } else {
                return "N/A";
              }
            }

            function checkScheduleDays() {
              if (showInfo.schedule.days.length !== 0) {
                return showInfo.schedule.days;
              } else {
                return "N/A";
              }
            }

            function checkScheduleTime() {
              if (showInfo.schedule.time !== "") {
                return showInfo.schedule.time;
              } else {
                return "N/A";
              }
            }

            function checkCast() {
              if (showInfo._embedded.cast.length !== 0) {
                return showInfo._embedded.cast.map((item) => item.person.name);
              } else {
                return "N/A";
              }
            }

            let modal = "";
            modal +=
              '<div class="modal-content text-bg-dark"><div class="modal-header"><h1 class="modal-title fs-5" id="exampleModalLabel">' +
              showInfo.name +
              '</h1><button  type="button"  class="btn-close"  data-bs-dismiss="modal"  aria-label="Close"></button></div><div class="modal-body"><div class="container row"><div class="img-box col"><img src="' +
              checkImage() +
              '" class="w-100"></div><div class="text-box col"><h2 class="mb-3 fs-1">' +
              showInfo.name +
              "</h2><p class='mb-3'>" +
              showInfo.summary +
              "</p><p class='mb-3 fs-5'><span class='fw-bold'>Genres: </span>" +
              checkGenres() +
              "</p><p class='mb-3 fs-5'><span class='fw-bold'>Network: </span>" +
              checkNetwork() +
              "</p><p class='mb-3 fs-5'><span class='fw-bold'>Status: </span>" +
              showInfo.status +
              "</p><p class='mb-3 fs-5'><span class='fw-bold'>Schedule: </span>" +
              checkScheduleDays() +
              " - " +
              checkScheduleTime() +
              "</p><p class='mb-3 fs-5'><span class='fw-bold'>Cast: </span>" +
              checkCast() +
              "</p></div></div></div></div>";

            document.getElementById("dialog").innerHTML = modal;
          }
          getShowInfo();
        });
      });
    }
    getSearch();
  }
}

getShow();
