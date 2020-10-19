/* Implementazione MVC di una relazione tra insiemi usando il Model Pattern*/
//Model
let createRelation = (function (){

    let pairs = [];
    let domain = [];

    let domainSet = false;
    /*
    ** Imposta il dominio della relazione.
    ** Ritorna true in caso di successo, false altrimenti (ie. anySet non e' un array)
    */
    function setDomain(anySet)
    {
        if(false == Array.isArray(anySet))
        {
            console.log(`DEBUG MSG:: errore in setDomain()! anySet non e' un Array!`)
            return false;
        }
        domain = anySet;
        domainSet = true; 

        return true;
    }
    /*
    ** Aggiunge una coppia ordinata (first, second) alla relazione.
    ** Ritorna true in caso di successo, false altrimenti.
    */
    function addPair(first, second)
    {
        /*
        ** se dominio e codominio non sono stati scelti, oppure i parametri non sono
        ** definiti, oppure gli elementi della coppia non appartengono a dominio e codominio
        ** EPIC FAIL (=> false)
        */
        if(undefined === first || undefined === second || domainSet === false ||
             -1 === domain.indexOf(first) ||-1 == domain.indexOf(second))     
        {
            console.log(`DEBUG MSG:: errore in addPair()! Parametri undefined o dominio/codomion non validi!`)
            return false;
        }
        pairs.push({first, second});
        return true;
    }
    /*
    ** Rimuove la prima occorrenza di un coppia ordinata (first, second)
    ** Ritorna true in caso di successo, false se i parametri non sono validi
    */
    function removePair(first, second)
    {
        if(undefined === first || undefined === second)
        {
            console.log(`DEBUG MSG:: error in removePair()! Parametri non validi!`);
            return false;
        }
        pairs = pairs.filter((el) => el.first === first && el.second === second );
        return true;
    }
    /*
    ** Restituisce l'array rappresentante la relazion
    */
    function getRelationSet()
    {
       return pairs;
    }
    /*
    ** Verifica se la relazione è simmetrica.
    ** Ritorna true in caso affermativo, false in caso negativo.
    */
    function isSymmetric()
    {
        let isit = true;

       for(let i = 0; i < pairs.length && isit === true; i++)
       {
           let currentPair = pairs[i];
           isit = pairs.some((item) => currentPair.first === item.second &&
            currentPair.second === item.first);
       }

       return isit;
    }
   /*
   ** Verifica se una relazione è riflessiva.
   ** Ritorna true in caso affermativo, false altrimenti.
   */
    function isReflexive()
    {
        let result = true;
        let createPair = function (a,b)
        {
            return {first: a, second: b};
        };

        for(let i = 0; i < domain.length; i++)
        {
        let pair = createPair(domain[i], domain[i]);
        result = pairs.some((item) => item.first === pair.first && item.second === pair.second);
        }

        return result;
    }
    /*
    ** Genera la matrice booleana della relazione
    */
    function getBooleanMatrix()
    {
        let matrix = [];
        //creazione della matrice
        for(let i = 0; i <= domain.length; i++)
        {
            matrix[i] = new Array(domain.length + 1);
        }
        //preparazione della tabella
        for(let i = 1; i <= domain.length; i++)
        {
            matrix[i][0] = domain[i - 1];
            matrix[0][i] = domain[i - 1];
        }
        //valutazione delle coppie appartenenti alla relazione
        for(let i = 1; i <= domain.length; i++)
        {
            for(let j = 1; j <= domain.length; j++)
            {
                let found = pairs.some((item) => item.first === matrix[j][0] &&
                item.second === matrix[0][i]);
                matrix[j][i] = found;
            }
        }
        return matrix;
    }
    /*
    ** Determina se la relazione è irriflessiva.
    ** Ritorna true in caso affermativo, false in caso negativo.
    */
    function isIrreflexive()
    {
        return !(pairs.some((item) => item.first === item.second));
    }
    /*
    ** Determina se la relazione è antisimmetrica.
    ** Restituisce true in caso affermativo, false altrimenti.
    */
    function isAntisymmetric()
    {
        let matrix = getBooleanMatrix();
        let isit = true;
        for(let i = 1; i <= domain.length && isit === true; i++)
        {
            for(let j = 1; j <= domain.length && isit === true; j++)
            {
                if(i !== j && matrix[i][j] === true && matrix[j][i])
                {
                    isit = false;
                }
            }
        }

        return isit;
    }
    /*
    ** Resetta la relazione
    */
    function reset()
    {
        pairs = [];
    }
    return {setDomain, addPair, removePair, getRelationSet, isSymmetric, isReflexive,reset,getBooleanMatrix, isIrreflexive, isAntisymmetric};
})();
//View
let createView = (function (){

    let matrixContainer = undefined;

    function setMatrixContainer(parentID)
    {
        matrixContainer = document.getElementById(parentID);
        
        if(undefined === matrixContainer)
        {
            return false;
        }
        return true;
    }

    function renderMatrix(parentID)
    {

    }

})();