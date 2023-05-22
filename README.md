# FatigueTester_WebApp
Django Web Application used for testing the mental fatigue of a user, which spends most of their day staring at screen.
To achieve it, application will use standarized, fatigue-assesing tests.

Application uses standarized `Stroop Test` for its basic functionality, where user is prompted to press appropriate buttons. 
After that, based on the reaction speed and corectness their fatigue level is evaluated. 
Algorithm classifies the user's result and the detailed tests results are plotted on the graph.

Application have a users system with two user types: `pateint` and `supervisor`. 
Both users have access to their tests (alongside test details) and survey database, while supervisors can also send the invitations to patients to gain access to their data.
