/*= =================================================
    DATA TRANSFORMS
  ************************************************** */

const getLastName = person => person.lastName;

const getFirstName = person => person.firstName;

// headshot URLs are scheme relative //
// prepend http: to prevent invalid schemes like file:// or uri://
const getImageUrl = person => `http:${person.headshot.url}`;

/**
 * Fisher-Yates shuffle
 */
const shuffleList = (list) => {
  // Make a copy & don't mutate the passed in list
  const result = list.slice(1);

  let tmp;
  let j;
  let i = result.length - 1;

  for (; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    tmp = result[i];
    result[i] = list[j];
    result[j] = tmp;
  }

  return result;
};


/**
 * Remove any people that do not have the name we are
 * searching for.
 */
const filterByName = (searchForName, personList) => {
  // Copy of personList
  let resultList = personList;

  // Copy of search query & format it for wider search
  const searchQuery = searchForName.toLowerCase().replace(/\s/g, '');
  const searchLength = searchQuery.length;

  // If the string is blank, show whole list
  if (searchQuery === '') {
    return resultList;
  }
  // Search now goes character by character to narrow down
  resultList = resultList.filter((person) => {
    // For the first (and last name)
    let wholeNameResult = person.firstName.toLowerCase() + person.lastName.toLowerCase();
    wholeNameResult = wholeNameResult.slice(0, searchLength);

    let lastNameResult = person.lastName.toLowerCase();
    lastNameResult = lastNameResult.slice(0, searchLength);

    return wholeNameResult === searchQuery || lastNameResult === searchQuery;
  });

  // If no one is in our array, return that info to show
  if (resultList.length < 1) { return [{ firstName: 'No one found', lastName: '', headshot: { url: 'undefined' } }]; }

  return resultList;
};


/**
 * Takes in a property of an object list, e.g. "name" below
 *
 *    people = [{ name: 'Sam' }, { name: 'Jon' }, { name: 'Kevin' }]
 *
 * And returns a function that will sort that list, e.g.
 *
 *    const sortPeopleByName = sortObjListByProp('name');
 *    const sortedPeople = sortPeopleByName(people);
 *
 *  We now have:
 *
 *    console.log(sortedPeople)
 *    > [{ name: 'Jon' }, { name: 'Kevin' }, { name: 'Sam' }]
 *
 */
const sortObjListByProp = prop => (objList) => {
  // Make a copy & don't mutate the passed in list
  const result = objList.slice(1);

  result.sort((a, b) => {
    if (a[prop] < b[prop]) {
      return -1;
    }

    if (a[prop] > b[prop]) {
      return 1;
    }

    return 1;
  });

  return result;
};

const sortByFirstName = sortObjListByProp('firstName');

// Doesn't acutally sort by last name
// const sortByLastName = (personList) => sortByFirstName(personList).reverse();
const sortByLastName = sortObjListByProp('lastName');
