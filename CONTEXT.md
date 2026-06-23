# Skincare Dossier

Skincare Dossier is a calm practice CRM for cosmetologists and medical-spa practitioners. This context defines the product language used around the dashboard, client work, appointments, and follow-up care.

## Language

**Dashboard**:
A single-day operating view for a practitioner. It summarizes today's schedule, active appointment load, and follow-up work that needs attention.
_Avoid_: Revenue dashboard, weekly occupancy report

**Today's Schedule**:
The list of appointments planned for the current day. Each appointment belongs to one client and one treatment.
_Avoid_: Agenda, calendar feed

**Appointment**:
A scheduled time slot between the practitioner and a client. An appointment may be confirmed or pending.
_Avoid_: Turn, booking record

**Client**:
A person receiving skincare, cosmetology, or medical-spa treatment from the practitioner. A client can have many appointments and many treatment sessions.
_Avoid_: Patient, user, account

**Treatment**:
The service or procedure planned for an appointment or recorded in a treatment history.
_Avoid_: Product, item

**Pending Follow-up**:
A client outreach task that remains open after a treatment or client status review. It is not income, revenue, or a payment state.
_Avoid_: Estimated income, revenue, lead

**Follow-up Queue**:
The actionable list of clients with pending follow-ups. It exists to help the practitioner decide who needs outreach next.
_Avoid_: Weekly occupancy, workload chart

**Daily Utilization**:
The share of today's available appointment time that is already booked. It is a same-day capacity signal, not a weekly occupancy model.
_Avoid_: Weekly occupancy, staffing report

## Flagged Ambiguities

**Pending Follow-ups vs. revenue**:
The dashboard should treat pending follow-ups as client-care work. It should not frame follow-ups as estimated income.

**Daily utilization vs. weekly occupancy**:
The dashboard may show same-day utilization, but it should not include a weekly occupancy section unless the product later adds a real weekly capacity model.

## Example Dialogue

Dev: Should the dark dashboard card show estimated income?

Domain expert: No. This dashboard is for daily practice focus. Show Pending Follow-ups so the practitioner knows which clients need outreach.

Dev: Should we include weekly occupancy below the daily utilization card?

Domain expert: No. Daily utilization is enough for this view. Use the lower panel for the Follow-up Queue so the dashboard stays action-oriented.
