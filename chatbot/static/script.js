// document.addEventListener("DOMContentLoaded", function () {
//     var questionInput = document.getElementById("question-input");
//     var sendButton = document.getElementById("send-button");
//     var chatMessages = document.getElementById("chat-messages");
  
//     sendButton.addEventListener("click", function () {
//       var question = questionInput.value;
//       if (question.trim() !== "") {
//         var message = document.createElement("div");
//         message.classList.add("message", "user-message");
//         message.textContent = "You: " + question;
//         chatMessages.appendChild(message);
  
//         questionInput.value = "";
  
//         fetch("/predict", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             question: question,
//           }),
//         })
//           .then(function (response) {
//             return response.json();
//           })
//           .then(function (data) {
//             var topModules = data.top_modules;
//             var topTitles = data.top_titles;
//             var linkDiskusi = data.link_diskusi;
  
//             // Display modules
//             for (var i = 0; i < topModules.length; i++) {
//               var moduleMessage = document.createElement("div");
//               moduleMessage.classList.add("message", "bot-message");
//               moduleMessage.textContent = "Bot: Module: " + topModules[i];
//               chatMessages.appendChild(moduleMessage);
//             }
  
//             // Display titles
//             for (var i = 0; i < topTitles.length; i++) {
//               var titleMessage = document.createElement("div");
//               titleMessage.classList.add("message", "bot-message");
//               titleMessage.textContent = "Bot: Title: " + topTitles[i];
//               chatMessages.appendChild(titleMessage);
//             }
  
//             // Display links
//             for (var i = 0; i < linkDiskusi.length; i++) {
//               var linkMessage = document.createElement("div");
//               linkMessage.classList.add("message", "bot-message");
//               linkMessage.innerHTML = "Bot: Link: <a href='" + linkDiskusi[i] + "' target='_blank'>" + linkDiskusi[i] + "</a>";
//               chatMessages.appendChild(linkMessage);
//             }
//           })
//           .catch(function (error) {
//             console.log("Error:", error);
//           });
//       }
//     });
//   });
  

document.addEventListener("DOMContentLoaded", function () {
    var questionInput = document.getElementById("question-input");
    var sendButton = document.getElementById("send-button");
    var chatMessages = document.getElementById("chat-messages");

    sendButton.addEventListener("click", function () {
        var question = questionInput.value;
        if (question.trim() !== "") {
            var message = document.createElement("div");
            message.classList.add("message", "user-message");
            message.textContent = "You: " + question;
            chatMessages.appendChild(message);

            questionInput.value = "";

            fetch("/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: question,
                }),
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var topModules = data.top_modules;
                    var topTitles = data.top_titles;
                    var linkDiskusi = data.link_diskusi;

                    // Display modules
                    for (var i = 0; i < topModules.length; i++) {
                        var moduleMessage = document.createElement("div");
                        moduleMessage.classList.add("message", "bot-message");
                        moduleMessage.textContent = "Bot: Module: " + topModules[i];
                        chatMessages.appendChild(moduleMessage);
                    }

                    // Display titles
                    for (var i = 0; i < topTitles.length; i++) {
                        var titleMessage = document.createElement("div");
                        titleMessage.classList.add("message", "bot-message");
                        titleMessage.textContent = "Bot: Title: " + topTitles[i].discussion_title;  // Access the discussion_title property
                        chatMessages.appendChild(titleMessage);
                    }

                    // Display links
                    for (var i = 0; i < linkDiskusi.length; i++) {
                        var linkMessage = document.createElement("div");
                        linkMessage.classList.add("message", "bot-message");
                        linkMessage.innerHTML = "Bot: Link: <a href='" + linkDiskusi[i].link_diskusi + "' target='_blank'>" + linkDiskusi[i].link_diskusi + "</a>";  // Access the link_diskusi property
                        chatMessages.appendChild(linkMessage);
                    }
                })
                .catch(function (error) {
                    console.log("Error:", error);
                });
        }
    });
});
