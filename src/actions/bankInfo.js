import ErrorMessages from "../constants/errors";
import statusMessage from "./status";
import API from "../constants/api";
import getUserData from "../actions/member";

/**
 * Update Bank information
 */
export function updateBankInfo(formData) {
  const { identification, cellphone } = formData;

  return dispatch =>
    new Promise(async (resolve, reject) => {
      // Validation checks
      if (!cellphone)
        return reject({ message: ErrorMessages.missingCellphone });
      if (!identification)
        return reject({ message: ErrorMessages.missingIdentification });

      await statusMessage(dispatch, "loading", true);
      API.post("/bank_info", {
        bank_info: {
          account_type: "nequi",
          identification: identification,
          account_number: cellphone
        }
      })
        .then(response => {          
          statusMessage(dispatch, "loading", false);
          
          return dispatch({
              type: "USER_BANK_UPDATE",
              dataBank: response.data.bank_info[0]
            })
        })
        .catch(async err => {
          console.log("error - bank info updateee");
          console.log(err)
          await statusMessage(dispatch, "loading", false);
          // throw err.message;
          throw "Problema cargando tus datos";
        });
    });
}
