import './App.css';
import NewUser from "./components/new-user/NewUser";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './container/main/Main';
import Home from './container/home/Home';
import MedicalHistory from "./components/forms/MedicalHistory.form";
import Error404 from './container/error404/Error404';
import PersonClose from './components/forms/PersonClose.form';
import ReadyRef from './components/forms/ReadyRef.form.jsx';
import IdDetails from './components/forms/IdDetails.form';
import DocLocation from './components/forms/DocLocation.form'
import InsuranceDetails from './components/forms/InsuranceDetails.form';
import MedPolicyDetails from './components/forms/MedPolicyDetails.form';
// import theme from './theme';
// import { makeStyles } from '@mui/material';
import TestCode from './components/testcode/TestCode'
import FireInsurance from './components/forms/FireInsurance.form';
import AccidentInsurance from './components/forms/AccidentInsurance.form'
import AmcsWarranty from './components/forms/AmcsWarranty.form';
import BankAccount from './components/forms/BankAccount.form';
import EcsMandates from './components/forms/EcsMandates.form';
import LoanDetails from './components/forms/LoanDetails.form';
import FixedRecrDeposits from './components/forms/FixedRecrDeposits.form';
import ShareBonds from './components/forms/ShareBonds.form';
import TradingAccount from './components/forms/TradingAccount.form';
import MutualfundDetails from './components/forms/MutualfundDetails.form';
import CreditDebit from './components/forms/CreditDebit.form';
import DebtLiabilities from './components/forms/DebtLiabilities.form';
import WalletDetails from './components/forms/WalletDetails.form';
import Locker from './components/forms/Locker.form';
import PensionAccount from './components/forms/Pension.form';
import DebitCardDetails from './components/forms/DebitCardDetails.form';
import CreditCardDetails from './components/forms/CreditCardDetails.form';
import ProvidentFund from './components/forms/ProvidentFund.form';
import PANCardDetails from './components/forms/PANCardDetails.form';
import PassportDetails from './components/forms/PassportDetails.form';
import ElectricWaterMeter from './components/forms/ElectricWaterMeter.form';
import GasPipeLine from './components/forms/GasPipeLine.form';
import CylinderAgency from './components/forms/CylinderAgency.form';
import LandlineDetails from './components/forms/Landline.form';
import DrivingLicence from './components/forms/DrivingLicence.form';
import AadharCard from './components/forms/AadharCard.form';
import ElectionCard from './components/forms/ElectionCard.form';
import IncomeTax from './components/forms/IncomeTax.form';
import RationCardDetails from './components/forms/RationCardDetails.form';
import HouseDetails from './components/forms/HouseDetails.form';
import UserRegistration from './components/userregistration/UserRegistration.form';
import Login from './components/userregistration/Login.form';
import ImportantDates from './components/forms/ImportantDates.form';
import Will from './components/will/Will';
import VehicleInsurance from './components/forms/VehicleInsurance.form';

import { FlashOnOutlined } from '@mui/icons-material';


function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="userregistration" element={<UserRegistration />} />
        <Route path="login" element={<Login />} />

        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="userdetails" element={<NewUser />} />
          <Route path="medicalhistory" element={<MedicalHistory />} />
          <Route path="personclose" element={<PersonClose />} />
          <Route path="readyref" element={<ReadyRef />} />
          <Route path="iddetails" element={<IdDetails />} />
          <Route path="doclocation" element={<DocLocation />} />
          <Route path="insurancedetails" element={<InsuranceDetails />} />
          <Route path="vehicleinsurance" element={<VehicleInsurance />} />
          <Route path="medpolicydetails" element={<MedPolicyDetails />} />
          <Route path="testcode" element={<TestCode />} />
          <Route path="fireinsurance" element={<FireInsurance />} />
          <Route path="accidentinsurance" element={<AccidentInsurance />} />
          <Route path="amcswarranty" element={<AmcsWarranty />} />
          <Route path="bankaccount" element={<BankAccount />} />
          <Route path="ecsmandates" element={<EcsMandates />} />
          <Route path="loandetails" element={<LoanDetails />} />
          <Route path="fixedrecrdeposits" element={<FixedRecrDeposits />} />
          <Route path="sharebonds" element={<ShareBonds />} />
          <Route path="tradingaccount" element={<TradingAccount />} />
          <Route path="mutualfunddetails" element={<MutualfundDetails />} />
          <Route path="creditdebit" element={<CreditDebit />} />
          <Route path="debtliabilities" element={<DebtLiabilities />} />
          <Route path="walletdetails" element={<WalletDetails />} />
          <Route path="locker" element={<Locker />} />
          <Route path="ppfaccount" element={<ProvidentFund />} />
          <Route path="pensionaccount" element={<PensionAccount />} />
          <Route path="debitcarddetails" element={<DebitCardDetails />} />
          <Route path="creditcarddetails" element={<CreditCardDetails />} />
          <Route path="pancarddetails" element={<PANCardDetails />} />
          <Route path="passportdetails" element={<PassportDetails />} />
          <Route path="electricwatermeter" element={<ElectricWaterMeter />} />
          <Route path="gaspipeline" element={<GasPipeLine />} />
          <Route path="cylinderagency" element={<CylinderAgency />} />
          <Route path="landlinedetails" element={<LandlineDetails />} />
          <Route path="drivinglicence" element={<DrivingLicence />} />
          <Route path="rationcard" element={<RationCardDetails />} />
          <Route path="aadharcard" element={<AadharCard />} />
          <Route path="electioncard" element={<ElectionCard />} />
          <Route path="incometax" element={<IncomeTax />} />
          <Route path="housedetails" element={<HouseDetails />} />
          <Route path="importantdates" element={<ImportantDates />} />
          <Route path="will" element={<Will />} />

          <Route path=":id" element={<Error404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;