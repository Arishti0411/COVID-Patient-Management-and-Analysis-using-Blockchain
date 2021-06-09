pragma solidity ^0.5.0;

contract healthcare {
	uint public blockCount = 0;

	 struct patientBlock {
        uint patient_aadhar_number;
        string patient_name;

        string hashvalue;

        uint fever;
        uint oxygenLevel;

        uint uprn;
        string doctor_name;

        string patient_precription;

        bool flag;

    }

     mapping(uint=>patientBlock) public record;

     constructor() public {
     	addPatientBlock(123456789123,
     		"Khushi",
     		 "1234567891234567896451",
     		 100,
     		 60,
     		 1234,
     		 "Dr. Ajay Jain",
     		 "On oxygen, remdesivir"
     		);
     }

     function addPatientBlock (
     	uint _patient_aadhar_number,
        string memory _patient_name,
		string memory _hashvalue,
        uint _fever,
        uint _oxygenLevel,
		uint _uprn,
        string memory  _doctor_name,
		string memory  _patient_precription
		)public{

     	for(uint i=1; i<=blockCount; i++){
     		if (keccak256(abi.encodePacked(record[i].patient_aadhar_number)) == keccak256(abi.encodePacked(_patient_aadhar_number))){
     			record[i].flag=false;
     		}
     	}

     	blockCount++;
     	record[blockCount] = patientBlock(_patient_aadhar_number,
     									  _patient_name,
     									  _hashvalue,
     									  _fever,
     									  _oxygenLevel,
     									  _uprn,
     									  _doctor_name,
     									  _patient_precription,
     									  true);
     }

     function getPatientDetail(
     	uint _patient_aadhar_number)
     view public returns(
     	 string memory ,
     	 string memory,
     	 uint,
     	 uint,
     	 uint,
     	 string memory,
     	 string memory
		){
     	 for(uint i=1; i<=blockCount; i++)
            {
            	if (keccak256(abi.encodePacked(record[i].patient_aadhar_number)) == keccak256(abi.encodePacked(_patient_aadhar_number))
            	   && record[i].flag==true){
            		return (record[i].patient_name,
            			    record[i].hashvalue,
            			    record[i].fever,
            			    record[i].oxygenLevel,
            			    record[i].uprn,
            			    record[i].doctor_name,
            			    record[i].patient_precription);
            	}
            }


     }
     uint [] high;
     uint [] low;
     uint [] medium;
     uint [3] severity;
    function calcSeverity() public{
        uint h=0;
        uint l=0;
        uint m=0;
        for(uint i=1;i<=blockCount;i++){
            if(record[i].flag==true){
                if(record[i].oxygenLevel<75){
                   h++;
                    high.push(record[i].patient_aadhar_number);
                }
                else if(record[i].oxygenLevel<85 && record[i].oxygenLevel>75){
                    if(record[i].fever>102){
                       h++;
                        high.push(record[i].patient_aadhar_number);
                    }
                    else {
                        m++;
                        medium.push(record[i].patient_aadhar_number);
                    }
                }
                else if(record[i].oxygenLevel>85){
                    l++;
                   low.push(record[i].patient_aadhar_number);
                }
            }
        }
        severity[0]=h;
        severity[1]=m;
        severity[2]=l;
    }
    function getAnalytics() view public returns(uint [3] memory,uint [] memory,uint[] memory, uint[] memory){
        return(severity,high,medium,low);
    }
}