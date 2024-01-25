import React, { useState } from 'react';

export default function EngineUI() {
  const [combinator, setCombinator] = useState('');
  const [forms, setForms] = useState([]);
  const [warningMessage, setWarningMessage] = useState('');

  const handleCombinatorChange = (event) => {
    setCombinator(event.target.value);
  };

  const handleAddForm = () => {
    const newForm = {
      combinator: combinator,
      rules: [],
    };
    setForms([...forms, newForm]);
  };

  const handleDeleteForm = (index) => {
    const updatedForms = [...forms];
    updatedForms.splice(index, 1);
    setForms(updatedForms);
  };

  const handleAddExpression = (index) => {
    const ruleType = document.getElementById(`inputRuleType${index}`).value;
    const operator = document.getElementById(`inputOperator${index}`).value;
    const value = document.getElementById(`inputValue${index}`).value;
    const score = document.getElementById(`inputScore${index}`).value;

    if (!ruleType || !operator || !value || isNaN(value) || !score || isNaN(score)) {
      setWarningMessage('Please fill in all fields with valid values.');
      return;
    }

    setWarningMessage('');

    const newExpression = {
      key: ruleType,
      output: {
        value: parseInt(value, 10),
        operator: operator,
        score: parseInt(score, 10),
      },
    };

    const updatedForms = [...forms];
    updatedForms[index].rules.push(newExpression);
    setForms(updatedForms);

    // Clear form fields
    document.getElementById(`inputRuleType${index}`).value = 'age';
    document.getElementById(`inputOperator${index}`).value = '>';
    document.getElementById(`inputValue${index}`).value = '';
    document.getElementById(`inputScore${index}`).value = '';
  };

  return (
    <>
      <div className='container'>
        <h1>Combinator</h1>
        <label htmlFor="combinatorSelect">Choose a Combinator</label>
        <select
          id="combinatorSelect"
          className="form-select"
          aria-label="Combinator selection"
          value={combinator}
          onChange={handleCombinatorChange}
        >
          <option value="" disabled>Select a Combinator</option>
          <option value="and">AND</option>
          <option value="or">OR</option>
        </select>
        <button type="button" className="btn btn-primary my-2 bg-success" onClick={handleAddForm}>
          Add Form
        </button>
      </div>

      {forms.map((form, formIndex) => (
        <div key={formIndex} className="container mt-4">
          <h2>Form {formIndex + 1}</h2>
          <div className="row g-3">
            <div className="col-md-2">
              <label htmlFor={`inputRuleType${formIndex}`} className="form-label">
                Rule Type
              </label>
              <select id={`inputRuleType${formIndex}`} className="form-select">
                <option value="age">Age</option>
                <option value="credit_score">Credit Score</option>
                <option value="account_balance">Account Balance</option>
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor={`inputOperator${formIndex}`} className="form-label">
                Operator
              </label>
              <select id={`inputOperator${formIndex}`} className="form-select">
                <option value=">">{'>'}</option>
                <option value="<">{'<'}</option>
                <option value=">=">{'>='}</option>
                <option value="<=">{'<='}</option>
                <option value="=">{'='}</option>
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor={`inputValue${formIndex}`} className="form-label">
                Value
              </label>
              <input type="text" className="form-control" id={`inputValue${formIndex}`} />
            </div>
            <div className="col-md-2">
              <label htmlFor={`inputScore${formIndex}`} className="form-label">
                Score
              </label>
              <input type="text" className="form-control" id={`inputScore${formIndex}`} />
            </div>
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-primary my-4"
                onClick={() => handleAddExpression(formIndex)}
              >
                Submit
              </button>
            </div>
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-danger my-4"
                onClick={() => handleDeleteForm(formIndex)}
              >
                Delete Form
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="json">
        <div className="container mt-5" style={{ backgroundColor: 'black', color: 'white', padding: '20px', borderRadius: '10px', width: '400px' }}>
          <h2>JSON</h2>
          <pre>{JSON.stringify({ rules: forms.flatMap(form => form.rules), combinator }, null, 2)}</pre>
        </div>
      </div>
      {warningMessage && (
        <div className="container mt-3">
          <div className="alert alert-warning" role="alert">
            {warningMessage}
          </div>
        </div>
      )}
    </>
  );
}
