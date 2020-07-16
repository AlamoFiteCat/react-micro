// [Base Imports]
import React from 'react';
import firebase from '../../util/firebase';
import moment from 'moment';

// [Material Imports]
import Button from '@material-ui/core/Button';

function matureInstallments() {
  firebase
    .firestore()
    .collection('loans')
    .onSnapshot((snapshot) => {
      const fetchedPlans = snapshot.docs.map((doc) => ({
        id: doc.id,
        repaymentPlan: doc.data().repaymentPlan,
      }));

      fetchedPlans.forEach((plan) => {
        plan.repaymentPlan.forEach((inst) => {
          if (
            moment(inst.installmentDate.seconds * 1000).isSame(moment(), 'day')
          ) {
            inst.due = true;
            firebase.firestore().collection('debts').add({
              loan: plan.id,
              amount: inst.installmentAmount,
              date: inst.installmentDate,
              installmentNo: inst.installmentNo,
              paid: false,
            });
          }
        });
        firebase.firestore().collection('loans').doc(plan.id).update({
          repaymentPlan: plan.repaymentPlan,
        });
      });
    });
}

const MaturityComponent = () => {
  return (
    <div>
      <h1>Maturity</h1>
      <Button variant="contained" color="primary" onClick={matureInstallments}>
        Mature All Installments
      </Button>
    </div>
  );
};

export default MaturityComponent;
