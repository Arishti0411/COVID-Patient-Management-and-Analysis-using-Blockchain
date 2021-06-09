App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask first.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
      web3.eth.sendTransaction({/* ... */})
    } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
    web3.eth.sendTransaction({/* ... */})
  }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const healthcare = await $.getJSON('healthcare.json')
    App.contracts.healthcare = TruffleContract(healthcare)
    App.contracts.healthcare.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.healthcare = await App.contracts.healthcare.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },

  renderTasks: async () => {
    // Load the total block count from the blockchain
    const blockCount = await App.healthcare.blockCount()
    const $blockTemplate = $('.blockTemplate')

    // Render out each block with a new block template
    for (var i = 1; i <= blockCount; i++) {
      // Fetch the block data from the blockchain
      const block = await App.healthcare.record(i)
      const PatientAadharNo = parseInt(block[0])
      const PatientName = block[1]
      const HashValue = block[2]
      const FeverLevel = parseInt(block[3])
      const OxygenLevel = parseInt(block[4])
      const DocUPRN = parseInt(block[5])
      const DocName = block[6]
      const PatientPrescription = block[7]
      


      // Create the html for the block
      const $newBlockTemplate = $blockTemplate.clone()
      $newBlockTemplate.find('.patientAadharNo').html(PatientAadharNo)
      $newBlockTemplate.find('.patientName').html(PatientName)
      $newBlockTemplate.find('.hashValue').html(HashValue)
      $newBlockTemplate.find('.feverLevel').html(FeverLevel)
      $newBlockTemplate.find('.oxygenLevel').html(OxygenLevel)
      $newBlockTemplate.find('.docUPRN').html(DocUPRN)
      $newBlockTemplate.find('.docName').html(DocName)
      $newBlockTemplate.find('.patientPrescription').html(PatientPrescription)
      $newBlockTemplate.find('input')




      // Put the task in the correct list
      $('#patientList').append($newBlockTemplate)


      // Show the task
      $newBlockTemplate.show()
    }
  },

  
  addPatientBlock: async () => {
    App.setLoading(true) 

    const PatientAadharNo = $('.adhar').val()
    const PatientName = $('.pn').val()
    const HashValue = $('.hv').val()
    const FeverLevel = $('.fl').val()
    const OxygenLevel = $('.ol').val()
    const DocUPRN = $('.uprn').val()
    const DocName = $('.dn').val()
    const PatientPrescription = $('.pp').val()    

    await App.healthcare.addPatientBlock(PatientAadharNo,PatientName,HashValue,FeverLevel,OxygenLevel,DocUPRN,DocName,PatientPrescription)
    window.location.reload()
  },

  getPatientDetail: async () => {


    const PatientAadharNo = $('.gA').val()
    console.log(PatientAadharNo)
    const block = await App.healthcare.getPatientDetail(PatientAadharNo)
    const PatientName = block[0].toString()
    const HashValue = block[1].toString()
    const FeverLevel = block[2].toString()
    const OxygenLevel = block[3].toString()
    const DocUPRN = block[4].toString()
    const DocName = block[5].toString()
    const PatientPrescription = block[6].toString()
      
    var span_element2 = document.getElementById("pN");
    span_element2.innerHTML = PatientName

    var span_element3 = document.getElementById("hV");
    span_element3.innerHTML = HashValue
    
    var span_element4 = document.getElementById("fL");
    span_element4.innerHTML = FeverLevel
    var span_element5 = document.getElementById("oL");
    span_element5.innerHTML = OxygenLevel


    var span_element6 = document.getElementById("dU");
    span_element6.innerHTML = DocUPRN

    var span_element7 = document.getElementById("dN");
    span_element7.innerHTML = DocName


    var span_element7 = document.getElementById("pP");
    span_element7.innerHTML = PatientPrescription

    
  },

  calcSeverity: async () =>{
    
    await App.healthcare.calcSeverity()
    const s=await App.healthcare.getAnalytics()
    const severity=s[0]
    const high=s[1]
    const medium=s[2]
    const low=s[3]
    const num_of_high=severity[0].toString()
    const num_of_medium=severity[1].toString()
    const num_of_low=severity[2].toString()

    const highlen=high.length
    const mediumlen=medium.length
    const lowlen=low.length

    var span_element2 = document.getElementById("hr");
    span_element2.innerHTML = num_of_high

    var span_element3 = document.getElementById("mr");
    span_element3.innerHTML = num_of_medium
    
    var span_element4 = document.getElementById("lr");
    span_element4.innerHTML = num_of_low
    
    i=0
    for(;i<highlen;i++){
    /* Print aadhar number of high severity patients using high array*/
    }
    for(i=0;i<mediumlen;i++){
      //Print aadhar number of medium severity patients using medium array
    }
    for(i=0;i<lowlen;i++){
      //Print aadhar number of low severity patients using low array
    }
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
