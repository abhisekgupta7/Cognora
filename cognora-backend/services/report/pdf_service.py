from weasyprint import HTML

class PDFService:
    def generate_report_pdf(self, report: dict, student_name: str, lesson_name: str) -> bytes:
        html = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; padding: 40px; color: #1C1C1C; }}
                h1 {{ color: #F97316; }}
                h2 {{ color: #1C1C1C; margin-top: 24px; }}
                ul {{ line-height: 1.8; }}
                .bottleneck {{ background: #FFF3E0; padding: 12px; border-left: 4px solid #F97316; }}
            </style>
        </head>
        <body>
            <h1>Learning Report — {lesson_name}</h1>
            <p><strong>Student:</strong> {student_name}</p>
            <h2>Summary</h2>
            <p>{report.get('summary', '')}</p>
            <h2>Mastered Concepts</h2>
            <ul>{''.join(f'<li>{c}</li>' for c in report.get('mastered_concepts', []))}</ul>
            <h2>Knowledge Gaps</h2>
            <ul>{''.join(f'<li>{g}</li>' for g in report.get('knowledge_gaps', []))}</ul>
            <h2>Bottleneck</h2>
            <div class="bottleneck">{report.get('bottleneck', '')}</div>
            <h2>Recommendations</h2>
            <ul>{''.join(f'<li>{r}</li>' for r in report.get('recommendations', []))}</ul>
        </body>
        </html>
        """
        return HTML(string=html).write_pdf()