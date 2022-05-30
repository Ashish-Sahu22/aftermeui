import '../../App.css';
import NewUser from "../new-user/NewUser";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from '../../container/main/Main';
import Home from '../../container/home/Home';
import MedicalHistory from "../forms/MedicalHistory.form";
import Error404 from '../../container/error404/Error404';
import PersonClose from '../forms/PersonClose.form';
import ReadyRef from '../forms/ReadyRef.form';
import IdDetails from '../forms/IdDetails.form';
import DocLocation from '../forms/DocLocation.form'
import InsuranceDetails from '../forms/InsuranceDetails.form';
import MedPolicyDetails from '../forms/MedPolicyDetails.form';
// import theme from './theme';
// import { makeStyles } from '@mui/material';
import TestCode from '../testcode/TestCode'
import FireInsurance from '../forms/FireInsurance.form';
import AccidentInsurance from '../forms/AccidentInsurance.form'
import AmcsWarranty from '../forms/AmcsWarranty.form';
import BankAccount from '../forms/BankAccount.form';
import EcsMandates from '../forms/EcsMandates.form';
import LoanDetails from '../forms/LoanDetails.form';
import FixedRecrDeposits from '../forms/FixedRecrDeposits.form';
import ShareBonds from '../forms/ShareBonds.form';
import TradingAccount from '../forms/TradingAccount.form';
import MutualfundDetails from '../forms/MutualfundDetails.form';
import CreditDebit from '../forms/CreditDebit.form';
import DebtLiabilities from '../forms/DebtLiabilities.form';
import WalletDetails from '../forms/WalletDetails.form';
import Locker from '../forms/Locker.form';
import PensionAccount from '../forms/Pension.form';
import DebitCardDetails from '../forms/DebitCardDetails.form';
import CreditCardDetails from '../forms/CreditCardDetails.form';
import ProvidentFund from '../forms/ProvidentFund.form';
import PANCardDetails from '../forms/PANCardDetails.form';
import PassportDetails from '../forms/PassportDetails.form';
import ElectricWaterMeter from '../forms/ElectricWaterMeter.form';
import GasPipeLine from '../forms/GasPipeLine.form';
import CylinderAgency from '../forms/CylinderAgency.form';
import LandlineDetails from '../forms/Landline.form';
import DrivingLicence from '../forms/DrivingLicence.form';
import AadharCard from '../forms/AadharCard.form';
import ElectionCard from '../forms/ElectionCard.form';
import IncomeTax from '../forms/IncomeTax.form';
import RationCardDetails from '../forms/RationCardDetails.form';
import HouseDetails from '../forms/HouseDetails.form';
import UserRegistration from '../userregistration/UserRegistration.form';
import Login from '../userregistration/Login.form';
import ImportantDates from '../forms/ImportantDates.form';
import Will from '../will/Will';
import VehicleInsurance from '../forms/VehicleInsurance.form';
import { FlashOnOutlined } from '@mui/icons-material';
import { Axios } from 'axios';


function Routing() {

  return (
    <>
      <Routes>
        <Route path="userregistration" element={<UserRegistration />} />
        <Route path="login" element={<Login />} />

        <Route path="/after" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/userdetails" element={<NewUser />} />
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
    </>
  );
}

export default Routing;