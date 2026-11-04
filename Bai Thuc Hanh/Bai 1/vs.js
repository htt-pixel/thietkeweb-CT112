// js/app.js
import { loadStorage, saveStorage } from './storage.js';
import { 
  renderItineraryUI, addItinerary, toggleItineraryStatus, deleteItineraryItem,
  renderTaskUI, addTask, toggleTaskStatus, deleteTaskItem 
} from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const weatherData = [
    { city: 'Biên Hòa', temp: '32°C', condition: 'Nắng nóng', icon: '☀️' },
    { city: 'Đà Lạt', temp: '18°C', condition: 'Sương mù & Se lạnh', icon: '🌫️' },
    { city: 'Vũng Tàu', temp: '29°C', condition: 'Nắng nhẹ & Gió biển', icon: '🌤️' }
  ];

  // DOM Elements
  const citySelect = document.getElementById('city-select');
  const weatherIcon = document.getElementById('weather-icon');
  const weatherTemp = document.getElementById('weather-temp');
  const weatherCondition = document.getElementById('weather-condition');
  const cityName = document.getElementById('city-name');
  const clockElement = document.getElementById('realtime-clock');

  const itineraryForm = document.getElementById('itinerary-form');
  const placeInput = document.getElementById('place-input');
  const timeInput = document.getElementById('time-input');
  const itineraryList = document.getElementById('itinerary-list');

  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const taskCount = document.getElementById('task-count');

  // Load State
  let state = loadStorage();

  // Khôi phục UI Thành phố & Thời tiết
  if (citySelect) citySelect.value = state.selectedCity;
  updateWeatherUI(state.selectedCity);

  // Khôi phục Danh sách Lịch trình & Task
  renderItineraryUI(state.itineraries, itineraryList);
  renderTaskUI(state.tasks, taskList, taskCount);

  // Realtime Clock tổng ở Header
  function updateClock() {
    const now = new Date();
    clockElement.textContent = now.toTimeString().split(' ')[0];
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Weather Event
  function updateWeatherUI(selectedCityName) {
    const cityData = weatherData.find(item => item.city === selectedCityName);
    if (cityData) {
      cityName.textContent = cityData.city;
      weatherIcon.textContent = cityData.icon;
      weatherTemp.textContent = cityData.temp;
      weatherCondition.textContent = cityData.condition;
    }
  }

  citySelect.addEventListener('change', (e) => {
    state.selectedCity = e.target.value;
    updateWeatherUI(state.selectedCity);
    saveStorage(state.itineraries, state.selectedCity, state.tasks);
  });

  // --- Xử lý Task ---
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    state.tasks = addTask(state.tasks, title);
    saveStorage(state.itineraries, state.selectedCity, state.tasks);
    renderTaskUI(state.tasks, taskList, taskCount);

    taskInput.value = '';
    taskInput.focus();
  });

  taskList.addEventListener('click', (e) => {
    const target = e.target;
    const itemEl = target.closest('.task-item');
    if (!itemEl) return;

    const taskId = itemEl.dataset.id;

    // Checkbox hoặc click vào trạng thái
    if (target.type === 'checkbox' || target.classList.contains('checkbox-container')) {
      state.tasks = toggleTaskStatus(state.tasks, taskId);
      saveStorage(state.itineraries, state.selectedCity, state.tasks);
      renderTaskUI(state.tasks, taskList, taskCount);
    }

    // Nút xóa task
    if (target.classList.contains('btn-delete-task')) {
      itemEl.style.animation = 'fadeOutUp 0.25s ease forwards';
      setTimeout(() => {
        state.tasks = deleteTaskItem(state.tasks, taskId);
        saveStorage(state.itineraries, state.selectedCity, state.tasks);
        renderTaskUI(state.tasks, taskList, taskCount);
      }, 250);
    }
  });

  // --- Xử lý Lịch trình ---
  itineraryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const place = placeInput.value;
    const time = timeInput.value;
    if (!place || !time) return;

    state.itineraries = addItinerary(state.itineraries, place, time);
    saveStorage(state.itineraries, state.selectedCity, state.tasks);
    renderItineraryUI(state.itineraries, itineraryList);

    placeInput.value = '';
    timeInput.value = '';
    placeInput.focus();
  });

  itineraryList.addEventListener('click', (e) => {
    const target = e.target;
    const itemEl = target.closest('.itinerary-item');
    if (!itemEl) return;

    const itemId = itemEl.dataset.id;

    if (target.classList.contains('btn-visited')) {
      state.itineraries = toggleItineraryStatus(state.itineraries, itemId);
      saveStorage(state.itineraries, state.selectedCity, state.tasks);
      renderItineraryUI(state.itineraries, itineraryList);
    }

    if (target.classList.contains('btn-delete')) {
      itemEl.classList.add('removing');
      setTimeout(() => {
        state.itineraries = deleteItineraryItem(state.itineraries, itemId);
        saveStorage(state.itineraries, state.selectedCity, state.tasks);
        renderItineraryUI(state.itineraries, itineraryList);
      }, 300);
    }
  });
});