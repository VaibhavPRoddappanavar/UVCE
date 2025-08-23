export const indiaMapSVG = `
<svg viewBox="0 0 1000 1200" xmlns="http://www.w3.org/2000/svg" class="india-map-svg">
  <defs>
    <pattern id="indianPattern" patternUnits="userSpaceOnUse" width="40" height="40">
      <rect width="40" height="40" fill="#FFF8DC"/>
      <circle cx="20" cy="20" r="3" fill="#D2691E" opacity="0.1"/>
    </pattern>
    <filter id="shadow">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1000" height="1200" fill="url(#indianPattern)"/>
  
  <!-- States with accurate geographic boundaries based on actual India map -->
  
  
  <!-- Jammu & Kashmir - Northwestern region -->
  <path id="jammu-kashmir" 
        d="M280,80 L380,60 L420,80 L450,120 L480,160 L450,200 L400,220 L350,200 L300,180 L260,140 L240,100 Z" 
        class="state-path" 
        data-state="jammu-kashmir"/>
  
  <!-- Ladakh - Northern high altitude region -->
  <path id="ladakh" 
        d="M480,60 L580,50 L650,80 L680,140 L660,200 L620,220 L580,200 L540,160 L500,120 L480,80 Z" 
        class="state-path" 
        data-state="ladakh"/>
  
  <!-- Himachal Pradesh - Mountain state -->
  <path id="himachal-pradesh" 
        d="M400,220 L480,200 L520,240 L500,280 L460,300 L420,280 L380,260 L380,240 Z" 
        class="state-path" 
        data-state="himachal-pradesh"/>
  
  <!-- Punjab - Agricultural heartland -->
  <path id="punjab" 
        d="M350,260 L420,240 L450,280 L430,320 L390,340 L350,320 L330,290 Z" 
        class="state-path" 
        data-state="punjab"/>
  
  <!-- Haryana - Surrounding Delhi -->
  <path id="haryana" 
        d="M430,320 L500,300 L540,340 L520,380 L480,400 L440,380 L420,350 Z" 
        class="state-path" 
        data-state="haryana"/>
  
  <!-- Delhi - National capital -->
  <path id="delhi" 
        d="M460,360 L485,350 L500,375 L485,395 L460,385 Z" 
        class="state-path" 
        data-state="delhi"/>
  
  <!-- Uttarakhand - Hill state -->
  <path id="uttarakhand" 
        d="M520,240 L600,220 L640,260 L620,300 L580,320 L540,300 L520,260 Z" 
        class="state-path" 
        data-state="uttarakhand"/>
  
  <!-- Uttar Pradesh - Large central state -->
  <path id="uttar-pradesh" 
        d="M540,340 L720,320 L780,380 L760,480 L700,520 L640,500 L580,480 L540,460 L520,420 L520,380 Z" 
        class="state-path" 
        data-state="uttar-pradesh"/>
  
  <!-- Rajasthan - Desert state -->
  <path id="rajasthan" 
        d="M200,320 L350,300 L420,380 L400,520 L360,600 L300,640 L240,620 L180,580 L160,500 L180,420 L200,360 Z" 
        class="state-path" 
        data-state="rajasthan"/>
  
  <!-- Gujarat - Western coastal state -->
  <path id="gujarat" 
        d="M160,580 L300,560 L340,640 L320,750 L280,820 L220,840 L160,820 L120,780 L100,720 L120,660 L140,620 Z" 
        class="state-path" 
        data-state="gujarat"/>
  
  <!-- Maharashtra - Western state -->
  <path id="maharashtra" 
        d="M340,640 L520,620 L580,700 L560,820 L500,860 L440,840 L380,800 L340,740 L320,680 Z" 
        class="state-path" 
        data-state="maharashtra"/>
  
  <!-- Madhya Pradesh - Central India -->
  <path id="madhya-pradesh" 
        d="M400,520 L700,500 L740,580 L720,680 L680,720 L620,700 L580,660 L540,640 L480,620 L440,580 L420,540 Z" 
        class="state-path" 
        data-state="madhya-pradesh"/>
  
  <!-- Bihar - Eastern state -->
  <path id="bihar" 
        d="M760,480 L860,460 L900,520 L880,580 L840,600 L800,580 L780,540 L760,500 Z" 
        class="state-path" 
        data-state="bihar"/>
  
  <!-- West Bengal - Eastern coastal -->
  <path id="west-bengal" 
        d="M840,600 L920,580 L960,640 L940,720 L900,760 L860,740 L840,700 L820,660 L820,620 Z" 
        class="state-path" 
        data-state="west-bengal"/>
  
  <!-- Jharkhand - Mineral rich state -->
  <path id="jharkhand" 
        d="M780,580 L880,560 L920,620 L900,680 L860,700 L820,680 L800,640 L780,600 Z" 
        class="state-path" 
        data-state="jharkhand"/>
  
  <!-- Odisha - Eastern coastal -->
  <path id="odisha" 
        d="M820,680 L920,660 L960,740 L920,820 L880,840 L840,820 L820,780 L800,740 L800,700 Z" 
        class="state-path" 
        data-state="odisha"/>
  
  <!-- Chhattisgarh - Central tribal state -->
  <path id="chhattisgarh" 
        d="M720,680 L820,660 L860,720 L840,780 L800,800 L760,780 L740,740 L720,700 Z" 
        class="state-path" 
        data-state="chhattisgarh"/>
  
  <!-- Telangana - South central -->
  <path id="telangana" 
        d="M580,820 L680,800 L720,860 L700,920 L660,940 L620,920 L580,880 L560,840 Z" 
        class="state-path" 
        data-state="telangana"/>
  
  <!-- Andhra Pradesh - Southeastern coast -->
  <path id="andhra-pradesh" 
        d="M660,940 L760,920 L800,980 L780,1040 L740,1080 L700,1060 L660,1020 L640,980 Z" 
        class="state-path" 
        data-state="andhra-pradesh"/>
  
  <!-- Karnataka - South central -->
  <path id="karnataka" 
        d="M500,860 L660,840 L700,920 L680,1020 L640,1080 L580,1100 L520,1080 L480,1040 L460,980 L480,920 Z" 
        class="state-path" 
        data-state="karnataka"/>
  
  <!-- Tamil Nadu - Southern tip -->
  <path id="tamil-nadu" 
        d="M580,1080 L740,1060 L780,1120 L760,1180 L720,1200 L640,1180 L580,1160 L540,1120 L540,1100 Z" 
        class="state-path" 
        data-state="tamil-nadu"/>
  
  <!-- Kerala - Southwestern coast -->
  <path id="kerala" 
        d="M480,1040 L580,1020 L620,1100 L600,1180 L560,1200 L500,1180 L460,1140 L440,1100 L460,1060 Z" 
        class="state-path" 
        data-state="kerala"/>
  
  <!-- Goa - Small coastal state -->
  <path id="goa" 
        d="M440,840 L500,830 L520,860 L500,890 L470,900 L450,880 L440,860 Z" 
        class="state-path" 
        data-state="goa"/>
  
  <!-- Assam - Northeast main state -->
  <path id="assam" 
        d="M900,520 L980,500 L1000,560 L980,620 L940,640 L900,620 L880,580 L880,540 Z" 
        class="state-path" 
        data-state="assam"/>
  
  <!-- Arunachal Pradesh - Northeastern border -->
  <path id="arunachal-pradesh" 
        d="M940,400 L1000,380 L1000,460 L980,500 L940,520 L900,500 L880,460 L900,420 Z" 
        class="state-path" 
        data-state="arunachal-pradesh"/>
  
  <!-- Meghalaya - Hill state -->
  <path id="meghalaya" 
        d="M920,620 L980,600 L1000,640 L980,680 L940,700 L920,680 L900,650 Z" 
        class="state-path" 
        data-state="meghalaya"/>
  
  <!-- Manipur - Northeastern state -->
  <path id="manipur" 
        d="M980,680 L1000,660 L1000,720 L980,740 L960,720 L960,700 Z" 
        class="state-path" 
        data-state="manipur"/>
  
  <!-- Mizoram - Southeastern northeast -->
  <path id="mizoram" 
        d="M940,700 L980,680 L1000,720 L980,760 L940,780 L920,760 L920,730 Z" 
        class="state-path" 
        data-state="mizoram"/>
  
  <!-- Tripura - Small northeastern state -->
  <path id="tripura" 
        d="M900,650 L940,630 L960,670 L940,700 L920,720 L900,700 L880,680 Z" 
        class="state-path" 
        data-state="tripura"/>
  
  <!-- Nagaland - Northeastern hill state -->
  <path id="nagaland" 
        d="M940,560 L1000,540 L1000,600 L980,620 L940,640 L920,620 L920,580 Z" 
        class="state-path" 
        data-state="nagaland"/>
  
  <!-- Sikkim - Small Himalayan state -->
  <path id="sikkim" 
        d="M860,460 L900,440 L920,480 L900,520 L880,540 L860,520 L840,500 Z" 
        class="state-path" 
        data-state="sikkim"/>

  <!-- State labels with improved positioning -->
  <g class="state-labels" style="pointer-events: none; font-family: 'Georgia', serif; font-size: 14px; font-weight: bold; fill: #1a5f3f;">
    <text x="365" y="150" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">J&K</text>
    <text x="565" y="130" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">Ladakh</text>
    <text x="450" y="260" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">HP</text>
    <text x="390" y="300" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">Punjab</text>
    <text x="470" y="360" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">Haryana</text>
    <text x="475" y="375" text-anchor="middle" class="state-label" style="font-size: 10px; text-shadow: 1px 1px 2px white;">Delhi</text>
    <text x="580" y="280" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">UK</text>
    <text x="630" y="420" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">UP</text>
    <text x="290" y="460" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">Rajasthan</text>
    <text x="220" y="700" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">Gujarat</text>
    <text x="450" y="740" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">Maharashtra</text>
    <text x="570" y="600" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">MP</text>
    <text x="820" y="540" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">Bihar</text>
    <text x="880" y="680" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">WB</text>
    <text x="840" y="640" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">Jharkhand</text>
    <text x="860" y="760" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">Odisha</text>
    <text x="780" y="740" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">CG</text>
    <text x="640" y="880" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">Telangana</text>
    <text x="720" y="1000" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">AP</text>
    <text x="570" y="980" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">Karnataka</text>
    <text x="660" y="1140" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">TN</text>
    <text x="540" y="1120" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">Kerala</text>
    <text x="470" y="865" text-anchor="middle" class="state-label" style="font-size: 11px; text-shadow: 1px 1px 2px white;">Goa</text>
    <text x="940" y="580" text-anchor="middle" class="state-label" style="text-shadow: 1px 1px 2px white;">Assam</text>
    <text x="940" y="460" text-anchor="middle" class="state-label" style="font-size: 11px; text-shadow: 1px 1px 2px white;">Arunachal</text>
    <text x="950" y="650" text-anchor="middle" class="state-label" style="font-size: 10px; text-shadow: 1px 1px 2px white;">Meghalaya</text>
    <text x="980" y="700" text-anchor="middle" class="state-label" style="font-size: 10px; text-shadow: 1px 1px 2px white;">Manipur</text>
    <text x="960" y="740" text-anchor="middle" class="state-label" style="font-size: 10px; text-shadow: 1px 1px 2px white;">Mizoram</text>
    <text x="920" y="675" text-anchor="middle" class="state-label" style="font-size: 10px; text-shadow: 1px 1px 2px white;">Tripura</text>
    <text x="960" y="580" text-anchor="middle" class="state-label" style="font-size: 10px; text-shadow: 1px 1px 2px white;">Nagaland</text>
    <text x="880" y="500" text-anchor="middle" class="state-label" style="font-size: 10px; text-shadow: 1px 1px 2px white;">Sikkim</text>
  </g>
  
  <!-- Decorative border -->
  <rect x="10" y="10" width="980" height="1180" fill="none" stroke="#8B4513" stroke-width="6" opacity="0.8"/>
  <rect x="20" y="20" width="960" height="1160" fill="none" stroke="#D2691E" stroke-width="3" opacity="0.6"/>
  
</svg>`;

