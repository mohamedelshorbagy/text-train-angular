let tupleData = "[('foul pretend to care about your feelings', {'entities': [(0, 4, 'CORE') , (5,13,'AFTER_CORE') ]}), ('foul is basic food in egypt', {'entities': [(0, 4, 'CORE')]}), ('foul is what I want', {'entities': [(0, 4, 'CORE')]}), ('foul are too tall and they pretend to care about your feelings', {'entities': [(0, 4, 'CORE')]}), ('foul?', {'entities': [(0, 4, 'CORE')]}), ('remove Do they bite?', {'entities': [(0, 6, 'REQUEST_REMOVE')]})]"
let result = tupleParsing(tupleData);
let changed = -1;


const backgroundColor = {
    "CORE": 'rgb(42,204,113)',
    "AFTER_CORE": 'rgb(52,152,210)',
    "REQUEST_REMOVE": 'rgb(231,70,69)'
}




renderPhrases();

render();


function getEntites(index) {

    let entitesConcatenated = '';

    for (let entity in backgroundColor) {
        entitesConcatenated += `
            <div class="entity" style="background: ${backgroundColor[entity]}; cursor: pointer; color: white;" onclick="changeEntity('${entity}', ${index})">
                ${entity}
            </div>
        `;
    }
    entitesConcatenated += '<hr />';

    return entitesConcatenated;
}






function showEntites(index, entityIndex) {

    changed = entityIndex;

    Array.from(document.querySelectorAll('[data-active'))
        .forEach(el => el.removeAttribute('data-active'));

    Array.from(document.querySelectorAll(`[data-key="${index}"]`))
        .forEach(el => {
            el.setAttribute('data-active', true);
        });


}



function changeEntity(newEntity, index) {
    let i = index;
    let phrase = result[i][0];
    let entites = result[i][1]['entities']; // Array
    let actualPhrase = result[i][2];
    if (entites && entites.length) { // Exist
        entites[changed][2] = newEntity;
        console.log(result[i][1]);
        for (let entity of entites) {
            /**
             * 0 => Start
             * 1 => End
             * 3 => Entity Name
             */
            let start = entity[0];
            let end = entity[1];
            let entityName = entity[2];
            let token = actualPhrase.substring(start, end);
            let tokenWithEntity = `<span entityName="${entityName}" onclick="showEntites(${i})" style="background: ${backgroundColor[entityName]}; cursor: pointer;">${token}</span>`;
            result[i][0] = result[i][0].replace(token, tokenWithEntity);
        }
    }

    render();
    renderPhrases();
}




function render() {
    const row = document.getElementById('row');
    row.innerHTML = '';
    result.forEach((item, index) => {
        row.innerHTML += `
        <div class="row">
            <div class="col-xs-11 col-xs-offset-1">
                <div class="form-control" contenteditable="true">
                ${item[0]}
                </div>
                <div class="entities well" style="display: none" data-key="${index}">
                    ${getEntites(index)}
                </div>
            </div>
        </div>
        `;
    });

}


function renderPhrases() {
    for (let i = 0; i < result.length; i++) {
        let phrase = result[i][0];
        let entites = result[i][1]['entities']; // Array
        result[i][2] = phrase;
        if (entites && entites.length) { // Exist
            for (let j = 0; j < entites.length; j++) {
                let entity = entites[j];
                /**
                 * 0 => Start
                 * 1 => End
                 * 3 => Entity Name
                 */
                let start = entity[0];
                let end = entity[1];
                let entityName = entity[2];
                let token = phrase.substring(start, end);
                let tokenWithEntity = `<span entityName="${entityName}" onclick="showEntites(${i}, ${j})" style="background: ${backgroundColor[entityName]}; cursor: pointer;">${token}</span>`;
                result[i][0] = result[i][0].replace(token, tokenWithEntity);
            }
        }
    }

    console.log(result);

}



function tupleParsing(tuple) {

    tuple = tuple.replace(/\(/g, '[').replace(/\)/g, ']');

    let result = eval(tuple);

    return result;
}


function tupleReverse(tuples) {

    let container = '[';
    let outerComma = ',';
    for (let i = 0; i < tuples.length; i++) {
        let tuple = tuples[i];
        let innerTuple = `(${qoutedString(tuple[0])},`; // Phrase

        let Entites = '';
        tuple[1]['entities'].forEach((el, index) => {
            let innerComma = ',';
            let tempString = el.reduce((acc, elm, idx) => {
                return idx == 0 ? ifStringQoutedIt(elm) : acc + ', ' + ifStringQoutedIt(elm);
            }, '');
            if (index === (tuple[1]['entities'].length - 1)) { // For concat inner tuples inside entities
                innerComma = '';
            }
            Entites += `(${tempString})${innerComma}`;
        });

        Entites = `{ 'entities': [${Entites}] }`;
        innerTuple += `${Entites})`;

        if (i === tuples.length - 1) {
            outerComma = '';
        }

        container += `${innerTuple}${outerComma}`
    }
    container += ']';
    return container;
}


function qoutedString(term) {
    if (typeof term === 'string') {
        return `'${term}'`;
    }
    return term;
}