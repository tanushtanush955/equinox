const IndividualUrl = 'http://127.0.0.1:8000/Web_IdR';
const InstitutionUrl =  'http://127.0.0.1:8000/Web_InR';
const LookupUrl = 'http://127.0.0.1:8000/lookup'

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
      const errorData = await response.json().catch(() => ({}));
      throw errorData;
    }

    const data = await response.json();
    return data; // Return response data (e.g., { uid: '12345', message: 'Success' })
  } catch (error) {
    console.error('Error sending registration data:', error);
    throw error; // Let the caller handle the error
  }
};

export const lookupRegistration = async (uid) => {
  const NEW_URL = LookupUrl+"/"+uid
  try {
    const response = await fetch(NEW_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw errorData;
    }
    const data = await response.json();
    if (Object.keys(data).length === 0) {
        return undefined;
    }
    return data;
  }
  catch (error){
    console.error('Error making GET request:', error.message);
    throw error;
  }
}

export const sendRegistrationDataInstitution = async (registrationData) => {
  try {
    const response = await fetch(InstitutionUrl, {
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