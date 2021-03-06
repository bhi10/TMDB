import { LitElement, html, css } from "lit";

import "@dreamworld/dw-icon";

export class TestProgress extends LitElement{
  static styles = [
    css`
      :host{
        height: 48px;
        width: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        transition: all 0.2s ease-in-out;
      }

      :host([selected]) stop{
        stop-color: #04BCD4;
      }

      :host([selected]) .inner{
        border: 3px solid #18899A;
      }

      :host([selected]) mwc-icon{
        color: #18899A;
      }

      .percentage{
        font-size: 12px;
      }

      .progress{
        position: absolute;
        width:100%;
        height: 100%;
      }

      .outer{
        height: 48px;
        width: 48px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .inner{
        height: 40px;
        width: 40px;
        border-radius: 50%;
        border: 3px solid #A0A2A7;
      }

      circle{
        fill: none;
        stroke: url(#GradientColor);
        stroke-width: 3px;
        stroke-dasharray: 135px;
      }

      svg{
        position: absolute;
        top: 0;
        left: 0;
        transform: rotate(-90deg);
      }

      dw-icon{
        --dw-icon-color: #A0A2A7;
      }
    `
  ]

  static properties = {
    progress: {
      type: Number,
      reflect: true
    },
    status: {
      type: String
    }
  }

  render(){
    return this._getInitView();
  }

  _getInitView(){

    if(this.status === "SCHEDULED"){
      return html`
        <div class="percentage"><mwc-icon>file_download</mwc-icon></div>
        <div class="progress">
          <div class="outer">
            <div class="inner"></div>
          </div>
        </div>
      `;
    }

    if(this.status === "READY"){
      return html`
        <div class="percentage"><mwc-icon>play_arrow</mwc-icon></div>
        <div class="progress">
          <div class="outer">
            <div class="inner"></div>
          </div>
        </div>
      `;
    }

    if(this.status === "DOWNLOADING"){
      let dashoffset = Math.round(135-(135*this.progress/100)) + "px";
      return html`
        <div class="percentage">${this.progress}%</div>
        <div class="progress">
          <div class="outer">
            <div class="inner"></div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="48px" height="48px">
          <defs>
              <linearGradient id="GradientColor">
                <stop stop-color="#FBFBFB" />
              </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="22" stroke-linecap="round" style="stroke-dashoffset: ${dashoffset};"/>
          </svg>
        </div>
      `;
    }
  }



  constructor(){
    super();
    this.progress = 0;
  }
}

window.customElements.define("test-progress", TestProgress);