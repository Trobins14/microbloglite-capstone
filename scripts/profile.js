
// Get the profile bio text area and save button elements
const profileBioElement = document.getElementById('profile-bio');
const saveBioButtonElement = document.getElementById('save-bio-button');

// Add an event listener to the save button
saveBioButtonElement.addEventListener('click', () => {
  const newBio = profileBioElement.value;

  // Send a request to the server to save the new bio
  fetch('/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ bio: newBio })
  })
  .then(response => response.json())
  .then(data => {
    // Display a success message
    alert('Profile bio saved successfully!');
  })
  .catch(error => {
    // Display an error message
    alert('Error saving profile bio: ' + error.message);
  });
});

// Send a request to the server to retrieve the updated bio
fetch('/api/profile/bio')
  .then(response => response.json())
  .then(data => {
    const profileBioElement = document.getElementById('profile-bio');
    profileBioElement.value = data.bio;
  })
  .catch(error => {
    console.error(error);
  });