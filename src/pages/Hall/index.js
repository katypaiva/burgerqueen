import React, { useState, useEffect } from 'react'
import firebase from '../../util/firebaseUtils'


function Hall() {
    const [state, setState] = useState([]);

    useEffect(
        () => {
            firebase.firestore().collection('Breakfast').doc('d5g6QUqDfsrbHOMTVR99')
            .get().then((doc => { setState(doc.data())}))
        },
        []
      );
 

    return (
        <div>
           <p></p>
        </div>
    )

}

export default Hall