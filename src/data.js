export const lightColors = {
  primary: '#91A8CE',
  secondary: '#04315F',
  tertiary: '#FFFBFA',
  background: '#FFFBFA',
  card: 'white',
  text: '#04315F',  
};

export const darkColors = {
  primary:   '#8a8a8a4d',
  secondary: '#E11D48', 
  tertiary:  '#121212ff', 
  background:'#0B0B0D', 
  card:      '#1A1A1D', 
  text:      '#F5F5F5', 
};

let category_descriptions = {
  'Stage Events':'Showcase your talent on the main stage.',
  'Art Events':'Unleash your creativity with a brush and canvas.',
  'Science and Math Events':'Challenge your mind with logical and scientific puzzles.',
  'Literary Events':'Prove your command over words and language.',
  'Left vs Right Brain Events':'A mix of logic and creativity to test both sides of your brain.',
  'Commerce Events':'Test your business acumen and strategic thinking.',
  'Cinema Events':'Showcase your filmmaking and editing skills.',
  'Exclusive Events':'Special events for select participants.'
}

export let eventsData = [];

function parse_fetched_events_data(data){
  let transformed_data = []
  for (const [key,value] of Object.entries(data)){
    for (const [key,value_inner] of Object.entries(value)){
      let new_eventdetails = {
        name: value_inner.event_name,
        details:value_inner.description,
        venue:value_inner.venue,
        rules:value_inner.rules,
        num_participants:value_inner.num_participants,
        num_teams:value_inner.num_teams,
        timings:value_inner.timings,
        contact_no:value_inner.contact_no,
        fees:value_inner.fees
      }
      const category_object = transformed_data.find(obj=>obj.category === value_inner.event_type);
      if (category_object){
        category_object.events.push(new_eventdetails);
      }
      else {
        let new_category = {
          category:value_inner.event_type,
          description:category_descriptions.event_type,
          events:[new_eventdetails]
        }
        transformed_data.push(new_category);
      }
    }
  }
  eventsData = transformed_data;
}

function LoadEventData(){
  fetch('http://127.0.0.1:8000/all_events').then(
    response =>{
      if (response.status != 200){
        throw new Error(`error occured in fetching events: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      parse_fetched_events_data(data);
  })
    .catch(error=> {
      console.error(`Error ${error}`)
    });
}
window.onload = LoadEventData;