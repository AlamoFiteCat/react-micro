// [Base Imports]
import React from "react";
import firebase from "../../util/firebase";
import moment from "moment";

// [Material Imports]
import Button from "@material-ui/core/Button";

const matureInstallments = () => {
  firebase
    .firestore()
    .collection("loans")
    .onSnapshot((snapshot) => {
      const fetchedPlans = snapshot.docs.map((doc) => ({
        id: doc.id,
        repaymentPlan: doc.data().repaymentPlan,
      }));

      fetchedPlans.forEach((plan) => {
        plan.repaymentPlan.forEach((inst) => {
          if (
            moment(inst.installmentDate.seconds * 1000).isSame(moment(), "day")
          ) {
            inst.due = true;
            firebase.firestore().collection("debts").add({
              loan: plan.id,
              amount: inst.installmentAmount,
              date: inst.installmentDate,
              installmentNo: inst.installmentNo,
              paid: false,
            });
          }
        });
        firebase.firestore().collection("loans").doc(plan.id).update({
          repaymentPlan: plan.repaymentPlan,
        });
      });
    });
};

const closeLoans = async () => {
  const loans = await firebase.firestore().collection("loans").get();
  loans.forEach(async (loan) => {
    let numberofPaidInstallments = 0;
    let numberOfMaturedInstallments = 0;
    const currentLoan = { id: loan.id, ...loan.data() };
    currentLoan.repaymentPlan.forEach((inst) => {
      if (inst.due) {
        numberOfMaturedInstallments++;
      }
    });
    const paidInstallments = await firebase
      .firestore()
      .collection("debts")
      .where("loan", "==", currentLoan.id)
      .where("paid", "==", "Yes")
      .get();
    paidInstallments.forEach((debt) => {
      numberofPaidInstallments++;
    });

    if (
      parseInt(currentLoan.installments) ===
        parseInt(numberOfMaturedInstallments) &&
      parseInt(numberOfMaturedInstallments) ===
        parseInt(numberofPaidInstallments)
    ) {
      firebase.firestore().collection("loans").doc(currentLoan.id).update({
        status: 2,
      });
    }
  });
};

const MaturityComponent = () => {
  return (
    <div>
      <h1>Maturity</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={matureInstallments}
        style={{ marginRight: 8 }}
      >
        Mature Installments
      </Button>
      <Button variant="contained" color="secondary" onClick={closeLoans}>
        Close Loans
      </Button>
    </div>
  );
};

export default MaturityComponent;
