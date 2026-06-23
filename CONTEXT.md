# Skincare Dossier

Skincare Dossier is a CRM for independent skincare and medical-spa practitioners. This context defines the domain language used by the scheduling, clinical history, profile, and practice settings surfaces.

## Language

**Practitioner**:
The authenticated professional using Skincare Dossier to manage clients, appointments, treatment history, and practice settings. In v1, records belong to one Practitioner.
_Avoid_: User when discussing domain ownership, account when discussing clinical work

**Client**:
A person receiving skincare or medical-spa services from a Practitioner. A Client can have many Appointments and many Cases.
_Avoid_: Patient, customer, contact

**Appointment**:
A scheduled booking between a Practitioner and optionally a Client for a Treatment. An Appointment tracks scheduling status but does not itself contain clinical notes.
_Avoid_: Event, meeting, visit when referring to scheduling records

**Availability Block**:
A period reserved on the Practitioner calendar for time off, administration, or another non-client booking. It blocks time but is not an Appointment.
_Avoid_: Appointment, event

**Treatment**:
A service offered by the Practitioner, such as HydraFacial or Chemical Peel. A Treatment can be referenced by Appointments and Cases.
_Avoid_: Product, procedure when referring to the service catalog

**Case**:
A clinical treatment-history entry for a Client. A Case may reference an Appointment, but it is created explicitly and is not automatically created by completing an Appointment.
_Avoid_: Appointment notes, report

**Practice Settings**:
The Practitioner configuration for working hours, lunch gap, slot interval, timezone, and daily capacity. These settings shape calendar and dashboard calculations.
_Avoid_: Preferences when referring to scheduling capacity

## Example Dialogue

Practitioner: "I need to block Friday afternoon for chart review."
Developer: "That is an Availability Block, not an Appointment, because no Client is booked."

Practitioner: "After Sarah's appointment, I need to write observations and recommendations."
Developer: "That becomes a Case linked to Sarah, optionally linked back to the Appointment."

Practitioner: "My dashboard utilization looks high."
Developer: "That comes from today's active Appointments compared with Practice Settings daily capacity."
