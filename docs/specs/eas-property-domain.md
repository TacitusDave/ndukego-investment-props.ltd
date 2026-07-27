# NHGP — Enterprise Architecture Specification (EAS)
## Version 1.0 — Section 1: Domain Model — Domain 1: Property Domain

### 1.0 Business Definition

A Property is any real-world real estate asset that the company owns, manages, markets,
develops, or sells. It is the central asset around which almost every other business process
revolves.

A property may be: Land, Residential Building, Commercial Building, Apartment, Duplex, Office,
Plaza, Warehouse, Mixed-use Development, Future Development, Investment Opportunity.

Everything in the platform eventually links back to a Property.

### 1.1 Purpose

The Property Domain exists to answer questions such as:
- What properties do we own?
- Which are available?
- Which have been sold?
- Which belong to which estate?
- Who inspected them?
- Who verified them?
- Which customer reserved them?
- Which documents belong to them?
- Which employee manages them?
- What is their legal status?

### 1.2 Property Categories

A Property MUST belong to one category:
LAND, HOUSE, DUPLEX, BUNGALOW, APARTMENT, COMMERCIAL, WAREHOUSE, OFFICE, SHOP, HOTEL,
ESTATE PLOT, FARM LAND, MIXED USE, INDUSTRIAL, LUXURY HOME, PROJECT DEVELOPMENT

### 1.3 Property Type

Separate from Category: Residential, Commercial, Industrial, Agricultural, Investment,
Mixed Use

### 1.4 Property Status

Changes throughout the property's lifecycle:
Draft → Pending Inspection → Pending Verification → Approved → Published → Reserved →
Under Negotiation → Under Contract → Sold → Archived (or Rejected)

### 1.5 Core Attributes

**Identity**: Property ID, UUID, Internal Property Number, Reference Code, Barcode/QR Code, Slug

**Naming**: Title, Display Name, Marketing Name, Internal Name, Description (Short/Long/
Marketing), Key Highlights, Investment Summary

**Classification**: Category, Type, Usage, Status, Priority, Featured Flag, Luxury Flag,
Investment Flag

**Location**: Country, State, LGA, City, District, Community, Street, House Number, Postal
Code, Google Maps Coordinates (Latitude/Longitude), Map Polygon, Estate, Phase, Section, Block,
Plot Number

**Physical Information**: Land Size, Building Area, Bedrooms, Bathrooms, Toilets, Floors,
Parking Spaces, Swimming Pool, Garden, Balcony, Garage, Gym, Security House, Electricity,
Water Supply, Drainage, Road Access, Internet Availability, Fencing, Gate, CCTV Availability,
Solar Installation, Smart Home Ready, Year Built, Construction Status, Building Condition

**Financial Information**: Listing Price, Market Value, Valuation Date, Purchase Cost,
Development Cost, Current Value, Expected ROI, Rental Yield, Installment Allowed, Reservation
Amount, Maintenance Fee, Service Charge, Agency Fee, Commission Rate, Discount Rules, Tax
Information

**Legal Information**: Ownership Type, Title Status, Certificate of Occupancy, Governor
Consent, Survey Plan, Deed of Assignment, Building Approval, Planning Approval, Environmental
Approval, Court Cases, Legal Restrictions, Encumbrances

**Media**: Main Cover Image, Gallery Images, Videos, Drone Videos, 360 Tour, Blueprint, Floor
Plans, Brochure, Virtual Tour

**Marketing**: SEO Title, SEO Description, Keywords, Meta Tags, Campaign, Featured Order,
Advertisement Status

**Analytics**: Views, Favorites, Bookings, Inspection Requests, Conversion Rate, Lead Score,
Popularity Score

**Audit**: Created By, Updated By, Approved By, Published By, Created Date, Updated Date,
Published Date, Archived Date

### 1.6 Relationships

```
Company → Estate → Development → Property
                                    ├── Documents
                                    ├── Images
                                    ├── Videos
                                    ├── Customer
                                    ├── Reservation
                                    ├── Inspection
                                    ├── Payment Records
                                    ├── Employees
                                    ├── AI Reports
                                    ├── Maintenance
                                    ├── Security Reports
                                    ├── Legal Records
                                    ├── Valuations
                                    ├── Contracts
                                    ├── Sales
                                    ├── Marketing Campaigns
                                    └── Audit Logs
```

### 1.7 Business Rules (non-negotiable)

1. A property cannot become Published unless: inspection completed, legal verification
   completed, required photographs uploaded, required documents uploaded, management approval
   completed.
2. A Sold property cannot return to Available.
3. Only Management can archive a property.
4. Only verified employees may approve a listing.
5. Every property must belong to one Estate or Development.
6. Every property must have at least one inspection.
7. Every legal document must be versioned.
8. Every change is audited forever. Nothing is deleted.

### 1.8 Lifecycle

Created → Inspection → Legal Verification → Management Review → Approved → Published →
Customer Interest → Inspection Booking → Reservation → Contract → Payment → Ownership
Transfer → Sold → Archived

### 1.9 Permissions by Role

- **Customer**: Can view published properties, bookmark, request inspection, reserve. Cannot
  edit anything.
- **Sales Staff**: Can create property, upload media, edit marketing. Cannot approve.
- **Inspector**: Can upload inspection reports, add observations, recommend approval.
- **Legal Officer**: Can upload legal documents, verify title, approve legal section.
- **Marketing Team**: Can publish advertisements, manage featured listings, SEO.
- **Finance**: Can attach valuation, record reservation, record payments, generate invoices.
- **Executive**: Can approve, archive, reject, view analytics, override approvals.
- **Super Administrator**: Full access.

### 1.10 Future AI Integration

Every property becomes an AI-understandable asset. Planned capabilities:
- Automatically generating marketing descriptions from property details
- Comparing a property's price against similar listings
- Estimating market value using historical transactions
- Detecting incomplete listings before publication
- Answering customer questions about a property using verified data only
- Flagging inconsistencies between uploaded documents and property information
- Recommending suitable properties to customers based on preferences and history

AI is an intelligent layer operating on top of a well-defined Property domain, not a separate
feature.

---

**Status: only Domain 1 (Property) of the EAS has been provided so far.** Domain 2 (Estate &
Development) and further domains are referenced in the source material but not yet supplied in
full detail — check for updated files before assuming this is the complete EAS.
