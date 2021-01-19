export interface Library {
    name: string;
    place: string;
    street: string;
    organization: string;
    site?: string;
    inn: number;
}

export interface LibraryList {
  libraries: Library[]
}

function state(): LibraryList {
  return {
    libraries: []
  }
};


export default state;
