function createLabel(event) {
  if (event.keyCode === 13) {
    var noteInput = document.getElementById("note-input");
    var noteText = noteInput.value.trim();

    if (noteText !== "") {
      // Check if label with the same text already exists
      var existingLabels = document.getElementsByClassName("label");
      var isDuplicate = Array.from(existingLabels).some(function(label) {
        return label.querySelector(".label-name").textContent === noteText;
      });

      if (!isDuplicate) {
        var wall = document.getElementById("wall");

        // Create label div for displaying question, answer, and image
        var label = document.createElement("div");
        label.className = "label";

        // Create container for label contents
        var contentContainer = document.createElement("div");
        contentContainer.className = "label-content";
        label.appendChild(contentContainer);

        // Create label name
        var labelName = document.createElement("h3");
        labelName.className = "label-name";
        labelName.textContent = noteText;
        contentContainer.appendChild(labelName);

        // Create question textarea
        var questionTextarea = document.createElement("textarea");
        questionTextarea.className = "question-input";
        questionTextarea.placeholder = "Enter a question";
        contentContainer.appendChild(questionTextarea);

        // Create answer textarea
        var answerTextarea = document.createElement("textarea");
        answerTextarea.className = "answer-input";
        answerTextarea.placeholder = "Enter the answer";
        contentContainer.appendChild(answerTextarea);

        // Create file input for image upload
        var imageInput = document.createElement("input");
        imageInput.type = "file";
        imageInput.className = "image-input";
        imageInput.accept = "image/*";
        imageInput.addEventListener("change", function(event) {
          var file = event.target.files[0];
          // Process the file as needed
        });

        // Create image input wrapper
        var imageInputWrapper = document.createElement("div");
        imageInputWrapper.className = "image-input-wrapper";
        imageInputWrapper.textContent = "Choose image";
        imageInputWrapper.appendChild(imageInput);
        contentContainer.appendChild(imageInputWrapper);

        // Create enter button
        var enterButton = document.createElement("button");
        enterButton.textContent = "Enter";
        enterButton.addEventListener("click", function() {
          var questionPoints = questionTextarea.value.trim().split("\n");
          var answerPoints = answerTextarea.value.trim().split("\n");
          if (questionPoints.length > 0 && answerPoints.length > 0) {
            // Create a FormData object to send the data via AJAX
            var formData = new FormData();
            formData.append('name', noteText);
            formData.append('question', questionTextarea.value);
            formData.append('answer', answerTextarea.value);
            formData.append('image', imageInput.files[0]);

            // Send the AJAX request
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/save_label/');
            xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));  // Add CSRF token
            xhr.onload = function() {
              if (xhr.status === 200) {
                console.log('Label data saved successfully.');
              } else {
                console.error('Error saving label data.');
              }
            };
            xhr.send(formData);
          }
        });
        contentContainer.appendChild(enterButton);

        // Append label to the wall
        wall.appendChild(label);

        noteInput.value = "";

        saveLabelsToStorage(); // Save the labels after creation
      }
    }

    event.preventDefault();
  }
}

function saveLabelsToStorage() {
  var labels = document.getElementsByClassName("label");
  var labelData = [];
  for (var i = 0; i < labels.length; i++) {
    var label = labels[i];
    var labelContent = {
      name: label.querySelector(".label-name").textContent,
      question: label.querySelector(".question-input").value,
      answer: label.querySelector(".answer-input").value
      // Add other properties as needed
    };
    labelData.push(labelContent);
  }
  localStorage.setItem("labels", JSON.stringify(labelData));
}

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function createLabelElement(label) {
  var wall = document.getElementById("wall");

  // Create label div for displaying question, answer, and image
  var labelDiv = document.createElement("div");
  labelDiv.className = "label";

  // Create container for label contents
  var contentContainer = document.createElement("div");
  contentContainer.className = "label-content";
  labelDiv.appendChild(contentContainer);

  // Create label name
  var labelName = document.createElement("h3");
  labelName.className = "label-name";
  labelName.textContent = label;
  contentContainer.appendChild(labelName);

  // Create question textarea
  var questionTextarea = document.createElement("textarea");
  questionTextarea.className = "question-input";
  questionTextarea.placeholder = "Enter a question";
  contentContainer.appendChild(questionTextarea);

  // Create answer textarea
  var answerTextarea = document.createElement("textarea");
  answerTextarea.className = "answer-input";
  answerTextarea.placeholder = "Enter the answer";
  contentContainer.appendChild(answerTextarea);

  // Create file input for image upload
  var imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.className = "image-input";
  imageInput.accept = "image/*";
  imageInput.addEventListener("change", function(event) {
    var file = event.target.files[0];
    // Process the file as needed
  });

  // Create image input wrapper
  var imageInputWrapper = document.createElement("div");
  imageInputWrapper.className = "image-input-wrapper";
  imageInputWrapper.textContent = "Choose image";
  imageInputWrapper.appendChild(imageInput);
  contentContainer.appendChild(imageInputWrapper);

  // Create enter button
  var enterButton = document.createElement("button");
  enterButton.textContent = "Enter";
  enterButton.addEventListener("click", function() {
    var questionPoints = questionTextarea.value.trim().split("\n");
    var answerPoints = answerTextarea.value.trim().split("\n");
    if (questionPoints.length > 0 && answerPoints.length > 0) {
      // Create a FormData object to send the data via AJAX
      var formData = new FormData();
      formData.append('name', label); // Add the label name to the form data
      formData.append('question', questionTextarea.value);
      formData.append('answer', answerTextarea.value);
      formData.append('image', imageInput.files[0]);

      // Send the AJAX request
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/save_label/');
      xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));  // Add CSRF token
      xhr.onload = function() {
        if (xhr.status === 200) {
          console.log('Label data saved successfully.');
          alert('Data entry successful!');
          questionTextarea.value = "";
          answerTextarea.value = "";
          imageInput.value = null;
        } else {
          console.error('Error saving label data.');
        }
      };
      xhr.send(formData);
    }
  });
  contentContainer.appendChild(enterButton);

  // Append label to the wall
  wall.appendChild(labelDiv);
}

// Modify the fetchLabels function to fetch labels from the server and pass them to the createLabelElement function
function fetchLabels() {
  fetch('/view_labels/')
    .then(response => response.json())
    .then(data => {
      const labels = data.labels;
      labels.forEach(label => {
        createLabelElement(label);
      });
    })
    .catch(error => {
      console.error('Error fetching labels:', error);
    });
}

// Modify the viewLabels function to call the fetchLabels function
function viewLabels() {
  fetchLabels();
}

// Call the viewLabels function initially
viewLabels();

// Add an event listener to the refresh button
var refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click", function() {
  viewLabels();
});

// Add an event listener to the note input
var noteInput = document.getElementById("note-input");
noteInput.addEventListener("keydown", createLabel);
