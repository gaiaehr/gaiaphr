<?php
/**
 * GaiaPHR (Patient Health Records)
 * Copyright (C) 2013 Certun, inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

if (!isset($_SESSION)) {
	session_name('PatientWebPortal');
	session_start();
	session_cache_limiter('private');
}
require_once($_SESSION['ROOT'].'/lib/tcpdf/tcpdf.php');

class PortalPDF extends TCPDF {

//	Page header
	public function Header() {
		// Logo
		$image_file = $_SESSION['ROOT'].'/resources/images/logos/logo.png';
		$y = 16;
		$x = 75;
		// Logo
		$this->Image($image_file, 10, 13, '', '', 'PNG', '', 'T', false, 1200, '', false, false, 0, false, false, false);
		// Address
		$this->SetFont('helvetica', '', 9);
		$this->SetY($y);
		$this->SetX($x);
		$this->Cell(95, 0, 'Address Street', '', false, 'L', 0, '', 0, false, 'M', 'M');
		$this->SetY($y + 4);
		$this->SetX($x);
		$this->Cell(95, 0, 'Address Street Cont.', '', false, 'L', 0, '', 0, false, 'M', 'M');
		$this->SetY($y + 8);
		$this->SetX($x);
		$this->Cell(95, 0, 'San Juan, PR 00000', '', false, 'L', 0, '', 0, false, 'M', 'M');

		// set phones
		$this->SetY($y);
		$this->SetX(165);
		$this->Cell(0, 0, 'Tel: (787) 000-0000', '', false, 'R', 0, '', 0, false, 'M', 'M');
		$this->SetY($y + 4);
		$this->SetX(165);
		$this->Cell(0, 0, 'Tel: (787) 000-0000', '', false, 'R', 0, '', 0, false, 'M', 'M');
		$this->SetY($y + 8);
		$this->SetX(165);
		$this->Cell(0, 0, 'Fax: (787) 000-0000', '', false, 'R', 0, '', 0, false, 'M', 'M');
		$this->Line(10,30,200,30, array('color' => array(38, 110, 172)));
	}

	// Page footer
	public function Footer() {
		// Position at 15 mm from bottom
		$this->SetY(-15);
		// Set font
		$this->SetFont('helvetica', 'I', 8);
		// Page number
		$this->Cell(0, 10, 'Page '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
	}
}

class PDF {


	private $pdf;
	public $output;

	/**
	 * @param $html
	 * @param $file
	 * @param string $output S = base64 string | E = base64 email friendly
	 */
	function __construct($html, $file, $output = 'S'){

		//define(K_PATH_IMAGES, '../resources/images');

		$this->pdf = new PortalPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
		$this->setPdfData();
		$this->setPdfDefaults();
		$this->write($html);
//		$this->sign();
		return $this->close($file, $output);
	}

	private function setPdfData(){
		$this->pdf->SetCreator(PDF_CREATOR);
		$this->pdf->SetAuthor('Patient Web Portal');
		$this->pdf->SetTitle('TCPDF Example 003');
		$this->pdf->SetSubject('TCPDF Tutorial');
		$this->pdf->SetKeywords('TCPDF, PDF, example, test, guide');
	}

	private function setPdfDefaults(){
		// set default header data
//		$this->pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);
		// set header and footer fonts
		$this->pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
		$this->pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
		// set default monospaced font
		$this->pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
		// set margins
		$this->pdf->SetMargins(PDF_MARGIN_LEFT, 35, PDF_MARGIN_RIGHT);
//		$this->pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
		$this->pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
		// set auto page breaks
		$this->pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
		// set image scale factor
		$this->pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
		// set font
		$this->pdf->SetFont('times', 'BI', 12);
	}

	public function write($html){
		$this->pdf->SetFont('helvetica', '', 9);
		// add a page
		$this->pdf->AddPage();
		// print a block of text using Write()
		$this->pdf->writeHTML($html, true, 0, true, 0);
	}

	private function sign(){
		//add signature
//		$this->pdf->SetY(265);
//		$this->pdf->SetX(15);
		$this->pdf->SetFont('helvetica', 'B', 9);
		$this->pdf->Cell(0, 20, '', '', 2, 'L', 0, '', 0, false, 'M', 'M');
		$this->pdf->Cell(0, 10, 'Electronically Signed by [patientName]', '', 2, 'L', 0, '', 0, false, 'M', 'M');
		$this->pdf->Cell(0, 0, 'On 2011/07/14 7:58am From IP 70.45.226.251 | Rev.1.2 | Ref.# 2454', '', false, 'L', 0, '', 0, false, 'M', 'M');
	}

	private function close($file, $output){
		//Close and output PDF document
		if($output == 'I') {
			$this->pdf->Output($file, 'I');
		}else{
			$this->output = $this->pdf->Output($file, $output);
		}
	}

}
//$html = <<<EOD
//<h1>Document Title</h1>
//<p>Lorem ipsum dolor sit amet, no invidunt percipitur sit, dictas inermis eu sit. Ne usu mutat possit. Per vivendum partiendo maiestatis cu, te sea ubique meliore. Pri labore detraxit conclusionemque ex. Wisi adhuc aliquip his te, cum ea odio augue inimicus.
//  </p>
//  <p>
//Ut eos nostro verterem. No qui senserit dignissim, prodesset sadipscing persequeris ius at. Ne duo aeterno phaedrum. Ullum dicam cu his, sonet audire luptatum ea mei. Eum adipisci lobortis dissentias te, vim percipit assueverit at. Ad mel harum disputationi.
//  </p>
//  <p>
//Duo partem maluisset et. An suscipit definitiones has. Eum omnis aliquando scripserit te, sea sapientem complectitur at. At mea odio argumentum.
//  </p>
//  <p>
//Te persius omnesque eam, vim ut aperiam constituto reformidans. Has corpora nominati ei, est in posse dicunt similique. Vix adhuc dolore incorrupte an, ei suas elit qui. Ius ea veritus suscipiantur. Te duis autem salutatus sit, iuvaret feugiat est ei, saepe iuvaret antiopam cu duo. In mel wisi necessitatibus, quem evertitur sadipscing mel et, te sit sonet vitae tibique.
//  </p>
//  <p>
//Tollit denique electram eum ei, choro audire cu vix. Mel munere electram te. Ad eum fugit partem perpetua, argumentum percipitur est at. Vis splendide torquatos et. Te labitur mnesarchum consequuntur vis. An graecis percipitur vis, eam illum suavitate ex.
//  </p>
//  <p>
//Qui id odio probatus mandamus, id duo case causae probatus, mei animal inermis omnesque et. Timeam maiorum sententiae no sit, tota constituam mel cu, an vel everti reformidans. Quo paulo viris commodo cu, pri prima epicuri no. Ei lorem meliore vis, ius esse falli alienum et, oportere expetendis id ius. Decore similique vituperatoribus est eu, cu mei diam ignota. Usu ex tempor voluptua reformidans, harum intellegat no pro. Veritus fuisset principes et pri, possim admodum pro in, at pro ubique scribentur necessitatibus.
//  </p>
//  <p>
//Graece causae debitis duo an, an quo tamquam aliquid urbanitas. Audire voluptua iracundia vel et. Quo ex iusto expetendis, utamur platonem necessitatibus mei eu, in pri audire persius iracundia. Ad modus graece mucius cum, et has clita recteque philosophia, et novum tincidunt vim. Consul deleniti platonem pri ne, ut mea dicat facilis abhorreant. Sea quas liber scripta ei, omittam aliquando prodesset per an.
//  </p>
//  <p>
//Ea appareat omittantur vis. Vim sint minimum voluptaria ex, libris moderatius mel te. Ad tempor graeco eum, nobis everti pertinax ius id. Mei assum atomorum ut, eu his summo altera vidisse, quo te probatus recteque. At pri persius eruditi. Natum mucius gloriatur sed eu, partem fuisset explicari eu qui.
//  </p>
//EOD;
//
//new PDF($html, 'pdfname.pdf', 'I');
