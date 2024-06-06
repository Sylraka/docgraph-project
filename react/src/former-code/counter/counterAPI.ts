// A mock function to mimic making an async request for data

// die funktion fetchCount erstellt ein Promise, welches nach einer verzögerung von 500ms  
// ein objekt mit einem "data:number" attribut zurück gibt, 
// welches den Wert vom Parameter "amount" erhält 

//die funktion, die dem promise übergeben wird, hat den parameter "resolve".
//resolve wiederum ist ebenfalls eine funktion. wird resolve aufgerufen, 
//wird das promise als "erfüllt"/"resolved" markiert.
export const fetchCount = (amount = 1) => {
  return new Promise<{ data: number }>(resolve =>
    setTimeout(() => resolve({ data: amount }), 500),
  )
}
