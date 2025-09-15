const IndividualUrl = 'http://127.0.0.1:8000/Web_IdR'; // Replace with your actual API endpoint

export const sendRegistrationDataIndividual = async (registrationData) => {
  try {
    const response = await fetch(IndividualUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Return response data (e.g., { uid: '12345', message: 'Success' })
  } catch (error) {
    console.error('Error sending registration data:', error);
    throw error; // Let the caller handle the error
  }
};