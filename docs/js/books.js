let allBooks = [];

const tableBody = document.getElementById('bookTable');
const searchInput = document.getElementById('searchInput');
const ratingFilter = document.getElementById('ratingFilter');
const dateFilter = document.getElementById('dateFilter');

// Detect environment and set data source
function getDataSource() {
  const isLocal = window.location.port === '3000';
  
  if (isLocal) {
    console.log('Running locally - using SQL database');
    return '/books/data';
  } else {
    console.log('Running on GitHub Pages - using JSON snapshot');
    return 'data/books.json';
  }
}

/* Fetch all data once */
fetch(getDataSource())
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    allBooks = data;
    populateDateFilter(data);
    renderTable(data);
  })
  .catch(error => {
    console.error('Error fetching books:', error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-danger">
          Error loading books. Please try again later.
        </td>
      </tr>
    `;
  });

/* Render table */
function renderTable(books) {
  tableBody.innerHTML = '';

  books.forEach(book => {
    tableBody.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.authors}</td>
        <td>${book.date_read ? formatDate(book.date_read) : 'Unread'}</td>
        <td>${book.rating ?? ''}</td>
        <td>${book.review ?? ''}</td>
      </tr>
    `;
  });
}

function formatDate(dateString) {
  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${year}-${month}-${day}`;
}

/* Populate date/year dropdown */
function populateDateFilter(books) {
  const years = [...new Set(
    books
      .filter(b => b.date_read)
      .map(b => new Date(b.date_read).getFullYear())
  )];

  years.sort((a,b) => b-a).forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    dateFilter.appendChild(option);
  });
}

/* Apply filters */
function applyFilters() {
  const search = searchInput.value.toLowerCase();
  const rating = ratingFilter.value;
  const selectedYear = dateFilter.value;

  const filtered = allBooks.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(search) ||
      book.authors.toLowerCase().includes(search) ||
      (book.review && book.review.toLowerCase().includes(search));

    let matchesRating = true;
    if (rating) {
      const num = parseInt(rating);
      if (num > 5) {
        matchesRating = rating === String(book.rating);
      } else {
        matchesRating = book.rating <= num;
      }
    }

    const matchesDate =
      !selectedYear || (book.date_read && new Date(book.date_read).getFullYear().toString() === selectedYear);

    return matchesSearch && matchesRating && matchesDate;
  });

  renderTable(filtered);
}

/* Event listeners */
searchInput.addEventListener('input', applyFilters);
ratingFilter.addEventListener('change', applyFilters);
dateFilter.addEventListener('change', applyFilters);