import React, { useState, useEffect } from 'react';

const DisputeManagement = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    search: ''
  });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data
  const [tickets, setTickets] = useState([
    {
      id: 'KN001',
      title: 'Sản phẩm không đúng mô tả',
      customer: 'Nguyễn Văn A',
      customerEmail: 'nguyenvana@email.com',
      order: 'ORD2025001',
      category: 'product',
      priority: 'high',
      status: 'pending',
      created: '2025-08-28 09:30',
      updated: '2025-08-28 14:15',
      sla: '2025-08-30 09:30',
      assignedTo: 'CS Team 1',
      description: 'Khách hàng đặt mua iPhone 15 Pro Max màu xanh nhưng nhận được màu đen. Yêu cầu đổi sản phẩm.',
      evidence: ['image1.jpg', 'image2.jpg'],
      resolution: '',
      timeline: [
        { time: '2025-08-28 09:30', action: 'Tạo ticket', user: 'System', note: 'Khách hàng gửi khiếu nại qua website' },
        { time: '2025-08-28 10:15', action: 'Tiếp nhận', user: 'CS Team 1', note: 'Đã xác nhận và phân loại khiếu nại' },
        { time: '2025-08-28 14:15', action: 'Liên hệ seller', user: 'CS Team 1', note: 'Đã liên hệ TechStore VN để xác minh' }
      ]
    },
    {
      id: 'KN002',
      title: 'Không nhận được hàng',
      customer: 'Trần Thị B',
      customerEmail: 'tranthib@email.com',
      order: 'ORD2025002',
      category: 'shipping',
      priority: 'medium',
      status: 'investigating',
      created: '2025-08-27 14:20',
      updated: '2025-08-28 11:30',
      sla: '2025-08-29 14:20',
      assignedTo: 'CS Team 2',
      description: 'Đặt hàng từ 5 ngày trước nhưng chưa nhận được. Tra cứu vận đơn hiện trạng thái "đã giao".',
      evidence: ['shipping_proof.jpg'],
      resolution: 'Đang liên hệ đơn vị vận chuyển để làm rõ',
      timeline: [
        { time: '2025-08-27 14:20', action: 'Tạo ticket', user: 'System', note: 'Khiếu nại từ chatbot' },
        { time: '2025-08-27 15:00', action: 'Xác minh đơn hàng', user: 'CS Team 2', note: 'Đã kiểm tra thông tin đơn hàng' },
        { time: '2025-08-28 11:30', action: 'Liên hệ vận chuyển', user: 'CS Team 2', note: 'Đã gửi yêu cầu làm rõ tới GHN' }
      ]
    },
    {
      id: 'KN003',
      title: 'Yêu cầu hoàn tiền do lỗi kỹ thuật',
      customer: 'Lê Văn C',
      customerEmail: 'levanc@email.com',
      order: 'ORD2025003',
      category: 'technical',
      priority: 'low',
      status: 'resolved',
      created: '2025-08-25 10:45',
      updated: '2025-08-26 16:20',
      sla: '2025-08-27 10:45',
      assignedTo: 'CS Team 1',
      description: 'Gặp lỗi khi thanh toán, tiền đã bị trừ nhưng đơn hàng không được tạo.',
      evidence: ['payment_screenshot.jpg', 'bank_statement.pdf'],
      resolution: 'Đã hoàn tiền 100% về tài khoản khách hàng. Thời gian: 3-5 ngày làm việc.',
      timeline: [
        { time: '2025-08-25 10:45', action: 'Tạo ticket', user: 'System', note: 'Khiếu nại qua email' },
        { time: '2025-08-25 11:30', action: 'Xác minh giao dịch', user: 'CS Team 1', note: 'Đã kiểm tra log hệ thống' },
        { time: '2025-08-26 09:00', action: 'Phê duyệt hoàn tiền', user: 'Manager', note: 'Chấp thuận hoàn tiền toàn bộ' },
        { time: '2025-08-26 16:20', action: 'Xử lý xong', user: 'CS Team 1', note: 'Đã hoàn tiền và đóng ticket' }
      ]
    }
  ]);

  const [stats, setStats] = useState({
    total: 45,
    pending: 12,
    investigating: 8,
    resolved: 25,
    slaBreached: 3,
    avgResolutionTime: '2.3 ngày',
    customerSatisfaction: 4.2
  });

  const categories = [
    { value: '', label: 'Tất cả danh mục' },
    { value: 'product', label: 'Sản phẩm' },
    { value: 'shipping', label: 'Vận chuyển' },
    { value: 'payment', label: 'Thanh toán' },
    { value: 'technical', label: 'Kỹ thuật' },
    { value: 'service', label: 'Dịch vụ' }
  ];

  const priorities = [
    { value: '', label: 'Tất cả mức độ' },
    { value: 'high', label: 'Cao' },
    { value: 'medium', label: 'Trung bình' },
    { value: 'low', label: 'Thấp' }
  ];

  const statuses = [
    { value: '', label: 'Tất cả trạng thái' },
    { value: 'pending', label: 'Chờ xử lý' },
    { value: 'investigating', label: 'Đang điều tra' },
    { value: 'resolved', label: 'Đã xử lý' },
    { value: 'escalated', label: 'Leo thang' }
  ];

  const solutions = [
    { value: 'exchange', label: 'Đổi hàng', icon: '🔄' },
    { value: 'return', label: 'Trả hàng', icon: '📦' },
    { value: 'refund', label: 'Hoàn tiền', icon: '💰' },
    { value: 'partial_refund', label: 'Hoàn một phần', icon: '💳' },
    { value: 'reject', label: 'Từ chối', icon: '❌' },
    { value: 'escalate', label: 'Leo thang', icon: '⬆️' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-700 bg-red-100';
      case 'medium': return 'text-yellow-700 bg-yellow-100';
      case 'low': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-orange-700 bg-orange-100';
      case 'investigating': return 'text-blue-700 bg-blue-100';
      case 'resolved': return 'text-green-700 bg-green-100';
      case 'escalated': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'product': return '📱';
      case 'shipping': return '🚚';
      case 'payment': return '💳';
      case 'technical': return '🔧';
      case 'service': return '🎧';
      default: return '📋';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    return (
      (filters.status === '' || ticket.status === filters.status) &&
      (filters.priority === '' || ticket.priority === filters.priority) &&
      (filters.category === '' || ticket.category === filters.category) &&
      (filters.search === '' || 
       ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
       ticket.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
       ticket.id.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const handleTicketAction = (ticketId, action, resolution = '') => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            status: action === 'resolve' ? 'resolved' : action,
            resolution: resolution || ticket.resolution,
            updated: new Date().toLocaleString('vi-VN'),
            timeline: [
              ...ticket.timeline,
              {
                time: new Date().toLocaleString('vi-VN'),
                action: action === 'resolve' ? 'Xử lý xong' : `Cập nhật: ${action}`,
                user: 'Current User',
                note: resolution || `Thực hiện hành động: ${action}`
              }
            ]
          }
        : ticket
    ));
  };

  const TicketDetailModal = () => {
    if (!selectedTicket) return null;

    const [resolution, setResolution] = useState(selectedTicket.resolution);
    const [selectedSolution, setSelectedSolution] = useState('');

    const handleSubmitSolution = () => {
      if (!selectedSolution) {
        alert('Vui lòng chọn phương án xử lý');
        return;
      }
      
      handleTicketAction(selectedTicket.id, 'resolve', `${solutions.find(s => s.value === selectedSolution)?.label}: ${resolution}`);
      setShowModal(false);
      setSelectedTicket(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getCategoryIcon(selectedTicket.category)}</span>
                <div>
                  <h3 className="text-xl font-semibold">#{selectedTicket.id} - {selectedTicket.title}</h3>
                  <p className="text-gray-500">Khách hàng: {selectedTicket.customer}</p>
                </div>
              </div>
              <button 
                onClick={() => {setShowModal(false); setSelectedTicket(null);}}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Ticket Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Mức độ ưu tiên:</span>
                      <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                        {selectedTicket.priority === 'high' ? 'Cao' : 
                         selectedTicket.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Trạng thái:</span>
                      <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status === 'pending' ? 'Chờ xử lý' :
                         selectedTicket.status === 'investigating' ? 'Đang điều tra' :
                         selectedTicket.status === 'resolved' ? 'Đã xử lý' : 'Leo thang'}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Đơn hàng: </span>
                      <span className="text-blue-600">{selectedTicket.order}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">SLA: </span>
                      <span className="text-red-600">{selectedTicket.sla}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Mô tả chi tiết</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedTicket.description}</p>
                </div>

                {/* Evidence */}
                {selectedTicket.evidence.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Bằng chứng đính kèm</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTicket.evidence.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                          <span className="text-blue-600">📎</span>
                          <span className="text-sm text-blue-700">{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Lịch sử xử lý</h4>
                  <div className="space-y-3">
                    {selectedTicket.timeline.map((event, index) => (
                      <div key={index} className="flex space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="font-medium text-gray-800">{event.action}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-500">{event.user}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-500">{event.time}</span>
                          </div>
                          {event.note && (
                            <p className="text-sm text-gray-600 mt-1">{event.note}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Panel */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Phương án xử lý</h4>
                  <div className="space-y-2">
                    {solutions.map((solution) => (
                      <label key={solution.value} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="solution"
                          value={solution.value}
                          checked={selectedSolution === solution.value}
                          onChange={(e) => setSelectedSolution(e.target.value)}
                          className="text-blue-600"
                        />
                        <span>{solution.icon}</span>
                        <span className="text-sm">{solution.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú xử lý
                  </label>
                  <textarea
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập chi tiết phương án xử lý..."
                  />
                </div>

                {selectedTicket.status !== 'resolved' && (
                  <div className="space-y-3">
                    <button
                      onClick={handleSubmitSolution}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                    >
                      Xử lý & Đóng ticket
                    </button>
                    <button
                      onClick={() => handleTicketAction(selectedTicket.id, 'escalated')}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                    >
                      Leo thang xử lý
                    </button>
                  </div>
                )}

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h5 className="font-medium text-yellow-800 mb-1">⚠️ Lưu ý SLA</h5>
                  <p className="text-yellow-700 text-sm">
                    Ticket này cần được xử lý trước {selectedTicket.sla}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Xử lý khiếu nại & Tranh chấp</h1>
          <p className="text-gray-600 mt-1">UC19 - Tiếp nhận, xác minh và xử lý ticket khiếu nại</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <span>📊</span>
            <span>Báo cáo SLA</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tổng ticket</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Chờ xử lý</p>
              <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Vi phạm SLA</p>
              <p className="text-3xl font-bold text-red-600">{stats.slaBreached}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Thời gian xử lý TB</p>
              <p className="text-3xl font-bold text-green-600">{stats.avgResolutionTime}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
            <input
              type="text"
              placeholder="ID, tiêu đề, khách hàng..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mức độ</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({...filters, priority: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priorities.map(priority => (
                <option key={priority.value} value={priority.value}>{priority.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => setFilters({status: '', priority: '', category: '', search: ''})}
              className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mức độ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SLA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getCategoryIcon(ticket.category)}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{ticket.id}</div>
                        <div className="text-sm text-gray-900">{ticket.title}</div>
                        <div className="text-xs text-gray-500">{ticket.created}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{ticket.customer}</div>
                    <div className="text-sm text-gray-500">{ticket.customerEmail}</div>
                    <div className="text-xs text-blue-600">{ticket.order}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority === 'high' ? 'Cao' : 
                       ticket.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status === 'pending' ? 'Chờ xử lý' :
                       ticket.status === 'investigating' ? 'Đang điều tra' :
                       ticket.status === 'resolved' ? 'Đã xử lý' : 'Leo thang'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className={new Date(ticket.sla) < new Date() ? 'text-red-600 font-medium' : ''}>
                      {ticket.sla}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    <button
                      onClick={() => {setSelectedTicket(ticket); setShowModal(true);}}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && <TicketDetailModal />}
    </div>
  );
};

export default DisputeManagement;
