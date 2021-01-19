export interface Library {
  libraries: [{
    name: string;
    place: string;
    street: string;
    organization: string;
    site?: string;
    inn: number;
  }]
}

function state(): Library {
  return {
    libraries: [
      {
        name: '',
        place: '',
        street: '',
        organization: '',
        site: '',
        inn: 0
      }
    ]
  }
};


export default state;
