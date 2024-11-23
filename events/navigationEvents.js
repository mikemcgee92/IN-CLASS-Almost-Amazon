import { signOut } from '../utils/auth';
import { booksOnSale, getBooks, searchBooks } from '../api/bookData';
import { favoriteAuthors, getAuthors } from '../api/authorData';
import { emptyBooks, showBooks } from '../pages/books';
import { emptyAuthors, showAuthors } from '../pages/authors';

// navigation events
const navigationEvents = (user) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(user.uid).then((result) => {
      if (result.length !== 0) {
        showBooks(result);
      } else {
        emptyBooks();
      }
    });
  });

  // ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(user.uid).then((result) => {
      if (result.length !== 0) {
        showBooks(result);
      } else {
        emptyBooks();
      }
    });
  });

  // Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(user.uid).then((result) => {
      if (result.length !== 0) {
        showAuthors(result);
      } else {
        emptyAuthors();
      }
    });
  });

  document.querySelector('#favorite-authors').addEventListener('click', () => {
    favoriteAuthors(user.uid).then((result) => {
      if (result.length !== 0) {
        showAuthors(result);
      } else {
        emptyAuthors();
      }
    });
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      searchBooks(user.uid, searchValue).then((result) => {
        console.warn(result);
        if (result.length !== 0) {
          showBooks(result);
        } else {
          emptyBooks();
        }
      });
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE

      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
