function fetchNextLabels() {
            fetch('/next_data_list/')  // Replace with the correct URL for the next_data_list endpoint
                .then(response => response.json())
                .then(data => {
                    const dataOption = document.getElementById('data-option');
                    dataOption.innerHTML = ''; // Clear previous options
                    data.labels.forEach(label => {
                        const option = document.createElement('option');
                        option.text = label;
                        dataOption.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error fetching labels:', error);
                });
        }

        function fetchRandomQuestionWithLabel() {
            const selectedLabel = document.getElementById('data-option').value;
            fetch(`/random_question/?label=${encodeURIComponent(selectedLabel)}`)
                .then(response => response.json())
                .then(data => {
                    const questionText = document.getElementById('question-text');
                    const correctAnswerText = document.getElementById('correct-answer-text');
                    const questionImage = document.getElementById('question-image'); // Get the image element

                    if (data.question) {
                        questionText.textContent = data.question;
                        correctAnswerText.textContent = data.answer;
                        document.getElementById('user-answer').value = ''; // Clear previous answer
                        hideAnswer();

                        // Set the image source if available
                        if (data.image) {
                            questionImage.src = data.image;
                        } else {
                            // If there is no image, hide the image box
                            questionImage.src = '';
                        }
                    } else {
                        questionText.textContent = 'No questions found.';
                        correctAnswerText.textContent = '';
                        hideAnswer();
                        questionImage.src = ''; // Clear the image if there are no questions
                    }
                })
                .catch(error => {
                    console.error('Error fetching question:', error);
                });
        }

        function checkAnswer() {
            const userAnswer = document.getElementById('user-answer').value.trim();
            const correctAnswer = document.getElementById('correct-answer-text').textContent;
            if (userAnswer === correctAnswer) {
                alert("Correct!");
            } else {
                alert("Wrong! Try again.");
            }
        }

        function showAnswer() {
            const correctAnswer = document.getElementById('correct-answer-text').textContent;
            document.getElementById('user-answer').value = correctAnswer;
        }

        function hideAnswer() {
            document.getElementById('user-answer').value = '';
        }

        // Add a function to fetch and populate the 'data-option' select element with labels.
        function fetchLabels() {
            fetch('/data_list/')  // Replace with the correct URL for the data_list endpoint
                .then(response => response.json())
                .then(data => {
                    const dataOption = document.getElementById('data-option');
                    dataOption.innerHTML = ''; // Clear previous options
                    data.labels.forEach(label => {
                        const option = document.createElement('option');
                        option.text = label;
                        dataOption.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error fetching labels:', error);
                });
        }

        // Call the fetchLabels function to populate the 'data-option' select element when the page loads.
        fetchLabels();