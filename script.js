document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.loader-wrapper');
    
    // Ensure the loader is visible initially
    loader.style.opacity = '1';
    loader.style.visibility = 'visible';

    // Hide loader after 5 seconds
    setTimeout(() => {
        loader.classList.add('hide');
        
        // Remove from DOM after transition completes
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); // Match this with CSS transition duration
    }, 5000);
});

const inputBox = document.getElementById('input-box');
const listTask = document.getElementById('list-task');

function addTask() {
    if (inputBox.value === '') {
        alert('Please enter a task!');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listTask.appendChild(li);
        saveData();
    }
    inputBox.value = '';
}

listTask.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem('data', listTask.innerHTML);
}

function showTask() {
    listTask.innerHTML = localStorage.getItem('data') || '';
}

function resetTasks() {
    if (listTask.innerHTML !== '') {
        if (confirm('Are you sure you want to delete all tasks?')) {
            listTask.innerHTML = '';
            saveData();
        }
    } else {
        alert('No tasks to reset!');
    }
}

// Add this event listener for the input box
inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

showTask();
