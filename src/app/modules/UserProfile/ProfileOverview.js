import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import {
  AdvanceTablesWidget7,
  ListsWidget10,
  ListsWidget14,
} from "../../../_metronic/_partials/widgets";
// import { toAbsoluteUrl } from "../../../_metronic/_helpers";
const tabTitle = [
  "Personal Information",
  "Company Information",
  "Other Details",
];
export function ProfileOverview() {
  const user = useSelector((state) => state.auth.user, shallowEqual);
  console.log("user : ", user);
  const [tabState, setTabState] = useState(0);

  return (
    <div className="card card-custom card-stretch">
      <div className="row card-body ">
        <div className="col-12 card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              {tabTitle.map((title, index) => {
                return (
                  <li
                    className="nav-item"
                    key={`profile-header-${index}`}
                    onClick={() => setTabState(index)}
                  >
                    <span
                      className={`nav-link font-weight-bold ${tabState ===
                        index && "active"}`}
                    >
                      {title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="card-body">{tabs(tabState, user)}</div>
        </div>
      </div>
    </div>
  );
}

function tabs(tabState, user) {
  switch (tabState) {
    case 0:
      return <PersonalInfo user={user} />;
    case 1:
      return <CompanyInfo user={user} />;
    case 2:
      return <OtherInfo user={user} />;

    default:
      return <PersonalInfo user={user} />;
  }
}

function PersonalInfo({ user }) {
  console.log("personal ... ", user);
  return (
    <>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">First Name :</div>
        <div className="text-muted col-8">{user.firstName}</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">Last Name :</div>
        <div className="text-muted col-8">{user.lastName}</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">User Name :</div>
        <div className="text-muted col-8">{user.userName}</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">Email :</div>
        <div className="text-muted col-8">{user.email}</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">Address :</div>
        <div className="text-muted col-8">{user.address1}</div>
      </div>
      {user.address2 && (
        <div className="row my-2">
          <div className="card-text col-4 font-weight-bold">
            Alternate Address :
          </div>
          <div className="text-muted col-8">{user.address2}</div>
        </div>
      )}
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">Country :</div>
        <div className="text-muted col-8">{user.country}</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">State :</div>
        <div className="text-muted col-8">{user.state}</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">City :</div>
        <div className="text-muted col-8">{user.city}</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">Postal code :</div>
        <div className="text-muted col-8">{user.postCode}</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">
          Communication Preference :
        </div>
        <div className="text-muted col-8">{user.communicationPref}</div>
      </div>
    </>
  );
}
function CompanyInfo({ user }) {
  return (
    <>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">Company Name :</div>
        <div className="text-muted col-8">{user.company.companyName}</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">Industry :</div>
        <div className="text-muted col-8">test</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">Phone :</div>
        <div className="text-muted col-8">test</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">Address :</div>
        <div className="text-muted col-8">{user.address1}</div>
      </div>
      {user.address2 && (
        <div className="row my-2">
          <div className="card-text col-4 font-weight-bold">
            Alternate Address :
          </div>
          <div className="text-muted col-8">{user.address2}</div>
        </div>
      )}
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">Country :</div>
        <div className="text-muted col-8">{user.country}</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">State :</div>
        <div className="text-muted col-8">{user.state}</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">City :</div>
        <div className="text-muted col-8">{user.city}</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">Postal code :</div>
        <div className="text-muted col-8">{user.postCode}</div>
      </div>
    </>
  );
}
function OtherInfo({ user }) {
  return (
    <>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">Your role</div>
        <div className="text-muted col-8">{user.roleInCompany}</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">Business Email :</div>
        <div className="text-muted col-8">{user.businessEmail}</div>
      </div>
      <div className="row my-2">
        <div className="card-text col-4 font-weight-bold">Business Phone :</div>
        <div className="text-muted col-8">{user.businessPhone}</div>
      </div>
    </>
  );
}
