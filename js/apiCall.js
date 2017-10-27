
/*= =================================================

API

************************************************** */

/**
 * Get the data from the namegame endpoint.
 *
 * The data comes back in the format:
 *
 *    [
 *        { firstName: 'Viju,  lastName: 'Legard',  headshot: { url: '...' } },
 *        { firstName: 'Matt', lastName: 'Seibert', headshot: { url: '...' } },
 *        ...
 *    ]
 */
const getPersonList = () => new Promise((resolve) => {
  fetch('https://willowtreeapps.com/api/v1.0/profiles')
    .then((response) => {
      response.json().then((imageList) => {
        resolve(imageList);
      });
    })
    .catch((error) => {
      console.log(`The following has occured: ${error}`);
      let imageList = [{firstName: 'Error', lastName: 'Cannot reach data', headshot: { url: 'undefined' }}];
      resolve(imageList);
    });
});
