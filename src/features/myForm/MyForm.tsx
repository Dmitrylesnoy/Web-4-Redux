import React, { FormEvent } from "react";
import styles from "./MyForm.module.css";
import { setX, setY, setR, validateX, validateY, validateR, resetForm, submitForm, selectMyForm } from "./myFormSlice";
import { useDispatch, useSelector } from "react-redux";

export function MyForm() {
  const dispatch = useDispatch();
  const { x, y, r, xError, yError, rError } = useSelector(selectMyForm);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(validateX());
    dispatch(validateY());
    dispatch(validateR());
    if (!xError && !yError && !rError) {
      dispatch(submitForm());
    }
  };

  return (
    <div className="card">
      <form id="formCoords" className={styles.formCoords} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="x" className={styles.requiredField}>
            X:
          </label>
          <div className={styles.radio}>
            {[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((val) => (
              <label key={val}>
                <input type="radio" name="x" value={val} checked={x === val} onChange={() => dispatch(setX(val))} />
                {val}
              </label>
            ))}
          </div>
          {xError && <div className={styles.errorMessage}>{xError}</div>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="y" className={styles.requiredField}>
            Y:
          </label>
          <input
            id="y"
            type="text"
            value={y}
            onChange={(e) => dispatch(setY(e.target.value))}
            maxLength={8}
            placeholder="От -5 до 5"
            required
          />
          <br />
          {yError && <div className={styles.errorMessage}>{yError}</div>}
        </div>
        <div id="r-group" className={styles.inputGroup}>
          <label htmlFor="r" className={styles.requiredField}>
            R:
          </label>
          <div className={styles.radio}>
            {[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((val) => (
              <label key={val}>
                <input type="radio" name="r" value={val} checked={r === val} onChange={() => dispatch(setR(val))} />
                {val}
              </label>
            ))}
          </div>
          {rError && <div className={styles.errorMessage}>{rError}</div>}
        </div>
        <div>
          <button type="submit">Check</button>
          <button type="button" onClick={() => dispatch(resetForm())}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
