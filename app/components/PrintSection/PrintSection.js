// '''''''''''''''''''''''*
/*
  This is an example app without redux implementation, may little bit messy.
  If your prefer use redux architecture you can change it.
  And We recommend to following this app pattern of redux.
*/
// '''''''''''''''''''''''*
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import 'dan-styles/vendors/invoice/style.css';
 
// const styles = {
//   whitePaper: {
//     background: '#FFF',
//     color: '#000',
//     minWidth: 800,
//     border: '1px solid #dedede'
//   } 
// };

const useStyles = makeStyles((theme) => ({
  whitePaper: {
    background: '#FFF',
    color: '#000',
    //minWidth: 860,
    //border: '1px solid #dedede'
  } 

}));

const PrintSection = React.forwardRef((props, ref) => {
//function PrintSection() {

  const classes = useStyles();
  
  return (
    <div className={classes.whitePaper} ref={ref}>
      <div id="page-wrap">
        <p id="header">Initial Notification</p>
        {/* <div id="identity">
          <textarea id="address" value="ashutosh" />
          <div id="logo">
            <img id="image" src="/images/print_logo.jpg" alt="logo" />
          </div>

        </div> */}

        <div style={{ clear: 'both' }} />
        

        {/* <div id="customer">
          <textarea id="customer-title" value="ashutosh" />
          <table id="meta">
            <tbody>
              <tr>
                <td className="meta-head">Print</td>
                <td>ashutosh</td>
              </tr>
             
              <tr>
                <td className="meta-head">Amount Due</td>
                <td>
                  <div className="due">
                    ashutosh
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>

        <table id="items">
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Unit Cost</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr id="hiderow">
              <td colSpan="5"><a id="addrow" href="#" title="Add a row"> Add a row</a></td>
            </tr>

            <tr>
              <td colSpan="2" className="blank"></td>
              <td colSpan="2" className="total-line">Subtotal</td>
              <td className="total-value">
                <div id="subtotal">
                  ashutosh
                </div>
              </td>
            </tr>

            <tr>
              <td colSpan="2" className="blank"></td>
              <td colSpan="2" className="total-line">Total</td>
              <td className="total-value">
                <div id="total">
                  Shutosh
                </div>
              </td>
            </tr>

            <tr>
              <td colSpan="2" className="blank"></td>
              <td colSpan="2" className="total-line">Amount Paid</td>
              <td className="total-value"><textarea value="ashutosh" /></td>
            </tr>

            <tr>
              <td colSpan="2" className="blank-last"></td>
              <td colSpan="2" className="total-line balance">Balance Due</td>
              <td className="total-value balance">
                <div className="due">
                  ashutosh
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div id="terms">
          <h5>Terms</h5>
          <textarea value="ashutosh" />
        </div> */}


        <table id="items" style={{ minWidth: '860px' }} >
          <tr class="activeNew-7">
            <td style={{ padding: '40px' }}>
            <span style={{ textAlign: 'center', display: 'block', fontSize: '22px', color: '#06425c', marginBottom: '45px', }} class="sec_text_1"><strong>Incident No.:</strong> 12WERDT-123</span>
            {/* <span class="sec_text_1">Incident Number</span>
            <input type="text" value="" size="20" class="form-control" readonly>
            <div class="tableHead">Initial Notification</div> */}
            <table id="items" style={{ minWidth: '860px' }} >
              <tr>
                <td style={{ padding: '20px'}}>
        
                  <div id="identity">
                    <div>
                      <p style={{display: 'inline-block', borderBottom: '2px solid #06425c', color: '#06425c', fontWeight: '600', fontSize: '18px', marginBottom: '20px', }}>Project Information</p>
                    </div>

                    <div style={{marginBottom: '15px',}}>
                      <p style={{fontSize: '0.88rem', fontWeight: '400', lineHeight: '1.2', color: '#737373',}}>Project Number</p>
                      <span style={{fontSize: '1rem', fontWeight: '600', color: '#063d55',}}>A23-ERT1236</span>
                    </div>

                    <div style={{marginBottom: '15px',}}>
                      <p style={{fontSize: '0.88rem', fontWeight: '400', lineHeight: '1.2', color: '#737373',}}>Project Name</p>
                      <span style={{fontSize: '1rem', fontWeight: '600', color: '#063d55',}}>NTPC </span>
                    </div>

                  </div>
                </td>
                <td style={{ padding: '20px' }}>
        
                    <div id="identity">
                      <div>
                        <p style={{display: 'inline-block', borderBottom: '2px solid #06425c', color: '#06425c', fontWeight: '600', fontSize: '18px', marginBottom: '20px',}}>Basic Information</p>
                      </div>

                      <div style={{marginBottom: '15px',}}>
                        <p style={{fontSize: '0.88rem', fontWeight: '400', lineHeight: '1.2', color: '#737373',}}>Project Number</p>
                        <span style={{fontSize: '1rem', fontWeight: '600', color: '#063d55',}}>A23-ERT1236</span>
                      </div>

                      <div style={{marginBottom: '15px',}}>
                        <p style={{fontSize: '0.88rem', fontWeight: '400', lineHeight: '1.2', color: '#737373',}}>Project Name</p>
                        <span style={{fontSize: '1rem', fontWeight: '600', color: '#063d55',}}>NTPC </span>
                      </div>

                    </div> 
                  </td>
              </tr>
            </table>

            <table id="items" style={{ minWidth: '860px' }} >
              <tr>
                <td style={{ padding: '20px'}}>
        
                  <div id="identity">
                    <div>
                      <p style={{display: 'inline-block', borderBottom: '2px solid #06425c', color: '#06425c', fontWeight: '600', fontSize: '18px', marginBottom: '20px', }}>Project Information</p>
                    </div>

                    <div style={{marginBottom: '15px',}}>
                      <p style={{fontSize: '0.88rem', fontWeight: '400', lineHeight: '1.2', color: '#737373',}}>Project Number</p>
                      <span style={{fontSize: '1rem', fontWeight: '600', color: '#063d55',}}>A23-ERT1236</span>
                    </div>

                    <div style={{marginBottom: '15px',}}>
                      <p style={{fontSize: '0.88rem', fontWeight: '400', lineHeight: '1.2', color: '#737373',}}>Project Name</p>
                      <span style={{fontSize: '1rem', fontWeight: '600', color: '#063d55',}}>NTPC </span>
                    </div>

                  </div>
                </td>
              </tr>
            </table>


            <table id="items" class="bordered cellpadding-0 cellspacing-0">
              <tr>
                {/* <!--Project Number--> */}
                <td>
                  <span class="sec_text_1">Project Number</span>
                    <input type="text"  class="form-control" size="22" maxlength="100" readonly />			  
                </td>
                
                {/* <!--Project Name--> */}
                <td>
                  <span class="sec_text_1">Project Name</span>
                  <input type="text" value="NTPC" class="form-control" size="20" maxlength="100" readonly />			  
                </td>
                {/* <!--Unit Number--> */}
                <td>
                    <span class="sec_text_1">Unit Number</span>
                    <input type="text" value="" class="form-control" size="20" maxlength="100" readonly />	  
                </td>
                {/* <!-- Unit Description --> */}
                <td> 
                    <span class="sec_text_1">Unit Description</span>
                    <input type="text" class="form-control" size="39" value="" readonly />
                </td>
              </tr>
            </table>
            <table id="items" class="bordered cellpadding-0 cellspacing-0">
                {/* <!--Date Incident Occurred--> */}
              <tr>	
                <td>
                  <span class="sec_text_1">Date Incident Occurred</span>
                  <input type="text" value="" class="form-control" size="22" maxlength="100" readonly />
                </td>
                {/* <!--Time Incident Occurred--> */}
                <td>
                  <span class="sec_text_1">Time Incident Occurred</span>
                  <input type="text" value="" class="form-control" size="20" maxlength="100" readonly />
                </td>
                {/* <!--Date Incident Reported--> */}
                <td>
                  <span class="sec_text_1">Date Incident Reported</span>
                  <input type="text" value="" class="form-control" size="20" maxlength="100" readonly />
                </td>

                {/* <!--Time Incident Reported--> */}
                <td>
                  <span class="sec_text_1">Time Incident Reported</span>
                  <input value="" class="form-control" size="39" maxlength="100" readonly />
                </td>
              </tr>
            </table>
            <div class="clear"></div>
            {/* <div class="row"><p></p></div> */}
            <table id="items" class="bordered cellpadding-0 cellspacing-0">
              <tr>
                {/* <!--Contractor--> */}
                <td>
                  <span class="sec_text_1">Contractor</span>
                  <input type="text" value="" class="form-control" size="40" maxlength="100" readonly />
                </td>
                {/* <!-- Contractor--> */}
                <td>
                  <span class="sec_text_1">Sub Contractor</span>
                    <input type="text" value="" size="30" class="form-control" maxlength="100" readonly />
                </td>
                {/* <!-- Reported--> */}
                <td>
                  <span class="sec_text_1">Reported by</span>
                  <input type="text" value="" size="39" class="form-control" maxlength="100" readonly />
                </td>
              </tr>

              <tr>			
                {/* <!-- Location of Incident --> */}
                <td>
                  <span class="sec_text_1">Location of Incident</span>
                  <input type="text" value="" size="40" class="form-control" maxlength="100" readonly />
                </td>
                {/* <!-- Sub Location --> */}
                <td>
                  <span class="sec_text_1">Sub Location</span>
                    <input type="text" value="" class="form-control" size="30" maxlength="100" readonly />
                </td>
                {/* <!-- Department --> */}
                <td>
                  <span class="sec_text_1">Department</span>
                    <input type="text" value="" class="form-control" size="39" maxlength="100" readonly />
                </td>
              </tr>
            </table>
            <div class="clear"></div>
            {/* <div class="row" style="height: 24px;"><p></p></div> */}
            <table id="items" class="bordered cellpadding-0 cellspacing-0">
              <tr>
                <td colspan="3" class="activeNew-2">
                  {/* <!--Incident Description--> */}
                  <span class="sec_text_1">Incident Description</span>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  {/* <!--Incident Description--> */}
                  <textarea rows="3" cols="132" class="form-control33" readonly >kajskdf</textarea>
                </td>
              </tr>
            </table>
            <div class="clear"></div>
            {/* <div class="row" style="height: 24px;"><p></p></div> */}
            <table id="items" class="bordered cellpadding-0 cellspacing-0"> 
              <tr class="activeNew-2"><td><span class="sec_text_1">Type of Incident</span></td></tr>
            </table>	
            <table id="items" class="bordered cellpadding-0 cellspacing-0">	
              <tr>
                <td>
                  <label><input type="radio" />Near miss</label>
                </td>
                {/* <!-- ram  --> */}
                <td>
                  <label><input type="radio" value="1" />Incident with No Injury</label>
                </td>
                <td>
                  <label><input type="radio" value="1" />First Aid</label>
                </td>
                <td>
                  <label><input type="radio" value="1" />LTI (Loss to Injury)</label>
                </td>
                <td>
                  <label><input type="radio"  value="1" />Fatal</label>
                </td>
              </tr>
            </table>
            <div class="clear"></div>
            {/* <div class="row" style="height: 24px;"><p></p></div> */}
            <table id="items" class="bordered cellpadding-0 cellspacing-0">
              <tr>
                <td colspan="5">
                  <span class="sec_text_1">Immediate Actions Taken</span>
                  <input type="text" value="" class="form-control" size="130" readonly />
                </td>
              </tr>	
            </table>	
            <div class="clear"></div>
            {/* <div class="row" style="height: 24px;"><p></p></div> */}
            <div class="row"><b>CARE OF INJURED WORKER</b></div>
            {/* <!-- Worker taken to Medical Centre? --> */}
            <table id="items" class="bordered cellpadding-0 cellspacing-0">
              <tr>
                {/* <!-- Worker taken Offsite for further assessment? Ram--> */}
                <td>
                  <span class="sec_text_1">Worker taken to Medical Centre?</span>
                  <input type="text" value="" class="form-control" size="57" readonly />
                </td>
                <td>
                  <span class="sec_text_1">Worker taken Offsite for further assessment?</span>
                  <input type="text" value="" class="form-control" size="68" readonly />
                </td>
              </tr>
              {/* <!-- If so, where? --> */}
              <tr>
                <td colspan="2">
                  <span class="sec_text_1">If so, where?</span>
                  <input type="text" value="" class="form-control" size="130" readonly />
                </td>	
              </tr>
            </table>
            <div class="clear"></div>
            {/* <div class="row" style="height: 30px;"><p></p></div>		 */}
            <table id="items" class="bordered cellpadding-0 cellspacing-0">
              <tr>
                <td class="activeNew-2">Person affected:</td>
                <td>
                  <label><input type="radio" value="1" checked />Yes</label>
                </td>
                <td>
                  <label><input type="radio" value="1"/>No</label>
                </td>
                
                <td>
                  <label><input type="radio" value="1"/>NA</label>
                </td>

                <td colspan="3">
                  <input type="text"  value="" class="form-control" size="62"  />
                </td>
              </tr>
                <tr>
                  <td class="activeNew-2" >Property damage:</td>
                  <td >
                    <label><input type="radio" value="" checked  />Yes</label>
                  </td> 

                  <td >
                    <label><input type="radio" value=""/>No</label>
                  </td>
                  
                  <td >
                  <label><input type="radio"  value=""/>NA</label>
                  </td>
                  <td colspan="3">
                  <input type="text"  value="" class="form-control" size="62" />
                  </td>
                </tr>
                <tr>
                  <td class="activeNew-2" >Equipment damage:</td>
                  <td >
                  <label><input type="radio"  value="1" checked  />Yes</label>
                  </td>
                        
                  <td >
                    <label><input type="radio" value="2"/>No</label>
                  </td> 
                  
                  <td >
                    <label><input type="radio" value="3"/>NA</label>
                  </td>
                  <td colspan="3">
                    <input type="text"  value="" class="form-control" size="62" />	
                  </td>
                </tr>	
                <tr>
                  <td  class="activeNew-2">Environmental details:</td>
                  <td >
                    <label><input type="radio" value="1" checked  />Spills</label>
                  </td>
                            
                  <td>
                    <label><input type="radio" value="2" checked  />Release</label>
                  </td>
                          
                  <td>
                    <label><input type="radio" value="3" checked  />Wildlife</label>
                  </td>
                          
                  <td>
                    <label><input type="radio" value="4" checked  />Water</label>	
                  </td>
                          
                  <td>
                    <label><input type="radio" value="5" checked  />NA</label>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td class="activeNew-2" >REPORTABLE TO:</td>
                  <td colspan="2">
                    <label><input type="checkbox" value="1" />Internal leadership</label>
                  </td>
                  <td>
                    <label><input type="checkbox" value="2" />Police</label>
                  </td>
                  <td>
                    <label><input type="checkbox" value="3" />Environment</label>
                  </td>
                  <td>
                    <label><input type="checkbox" value="4" />OHS</label>
                  </td>
                  <td>
                    <label><input type="checkbox"  value="5" />Mutual aid</label>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
//}
});


// PrintSection.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default PrintSection;

//export default withStyles(styles)(PrintSection);
